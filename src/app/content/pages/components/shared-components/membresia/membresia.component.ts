import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";
import * as moment from "moment";
import { ModalSelect } from "../modalSingleElement/modalSelect.component";
import { Membresia } from "../../../../models/membresia";
import { Select } from "../../../../models/generales";
import { Servicio } from "../../../../models/servicio";
import { Venta, Cuota } from "../../../../models/venta";
import { Descuento, DescuentoBuilder } from "../../../../models/descuento";

@Component({
  selector: "m-membresia",
  templateUrl: "./membresia.component.html",
  styleUrls: ["./membresia.component.scss"]
})
export class MembresiaComponent implements OnInit, OnChanges {
  @Input() membresia: Membresia & { cuotas: Cuota[] }; // Ojo!! cualquier cambio a la membresia va a modificar la membresia que se paso por parametro
  @Input() seleccionada: boolean = false;
  @Input() descuentoSocio: Descuento;
  @Input() controlada: boolean = false;
  @ViewChild(ModalSelect) modalSelect;
  @Output() onCheck = new EventEmitter();
  @Output() onUncheck = new EventEmitter();
  detalleServicio: Servicio[] = [];
  detalleCuotas = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes) {
    this.seleccionada = changes.seleccionada.currentValue;
  }

  agregarDescuento() {
    this.modalSelect.select = new Select(
      "Descuento",
      this.membresia.descuentosDisponibles.filter(d => d.tipo === "membresia"),
      null,
      "nombre",
      "id"
    );
    this.modalSelect.callbackFunction = id => {
      this.membresia.descuento = this.membresia.descuentosDisponibles.find(
        desc => desc.id === Number(id)
      );
    };
    this.modalSelect.show();
  }

  quitarDescuento() {
    this.membresia.descuento = null;
  }

  membresiaTieneDescuentoSocio = () =>
    this.descuentoSocio &&
    this.membresia.descuentosDisponibles.some(
      d => d.id === this.descuentoSocio.id
    );

  descuentoMembresia() {
    const descuentoMemb = this.membresia.descuento
      ? this.membresia.descuento.porcentaje
      : 0;
    const descuentoSocio = this.membresiaTieneDescuentoSocio()
      ? this.descuentoSocio.porcentaje
      : 0;
    return (this.membresia.precio * (descuentoMemb + descuentoSocio)) / 100;
  }

  membresiaConDescuento() {
    return (
      this.membresia.descuento !== null || this.membresiaTieneDescuentoSocio()
    );
  }

  calcularPrecioConDescuento() {
    const descuentoMembresia = this.descuentoMembresia();
    return this.membresia.precio - descuentoMembresia;
  }

  tipoDescuento() {
    const resultados = [];
    const descMemb = "Descuento de membresia";
    const descCuotas = "Precio fijo en cuota 0";
    const descSocio = "Descuento de socio";
    if (this.membresia.descuento) {
      resultados.push(descMemb);
    }
    if (this.membresiaTieneCuotas()) {
      resultados.push(descCuotas);
    }
    if (this.descuentoSocio) {
      resultados.push(descSocio);
    }
    return resultados.join("<br/>");
  }

  mostrarDetalleServicio(servicio) {
    if (this.detalleMostrado(servicio)) {
      this.detalleServicio = this.detalleServicio.filter(d => d !== servicio);
    } else {
      this.detalleServicio = [...this.detalleServicio, servicio];
    }
  }

  seleccionar() {
    this.seleccionada = !this.seleccionada;
    if (this.seleccionada) {
      this.onCheck.emit(this.membresia);
    } else {
      this.onUncheck.emit(this.membresia);
    }
  }

  detalleMostrado(servicio) {
    return this.detalleServicio.some(d => d.id === servicio.id);
  }

  mostrarDetalleCuota(membresia) {
    if (this.mostrandoDetalleCuota(membresia)) {
      this.detalleCuotas = this.detalleCuotas.filter(d => d !== membresia);
    } else {
      this.detalleCuotas = [...this.detalleCuotas, membresia];
    }
  }

  mostrandoDetalleCuota(membresia) {
    return this.detalleCuotas.some(d => d.id === membresia.id);
  }

  membresiaTieneCuotas = () => this.membresia.cuotas !== undefined;

  membresiaTieneCuotasImpagas = () =>
    this.membresiaTieneCuotas() && this.cuotaAPagar() !== undefined;

  estadoCuotaAPagar() {
    return moment(this.cuotaAPagar().fechaVto).isSameOrBefore(moment())
      ? "m-badge--danger"
      : "m-badge--info";
  }

  cuotaAPagar = () =>
    this.membresia.cuotas
      .sort((a, b) => a.nroCuota - b.nroCuota)
      .find(c => !c.pagada);

  calcularVencimientoCuota(membresia) {
    if (this.membresiaTieneCuotas()) {
      const cuotas = membresia.cuotas.map(c =>
        c.pagada
          ? `Vto. cuota ${c.nroCuota}: ${c.fechaVto} (Pagada)`
          : `Vto. cuota ${c.nroCuota}: ${c.fechaVto} (Pendiente)`
      );
      return cuotas;
    } else {
      const vencimiento = moment();
      const cuotas = new Array(membresia.nroCuotas)
        .fill(0)
        .map(
          (_, index) =>
            `Vto. cuota ${index + 1}: ${vencimiento
              .add(index * membresia.vencimiento)
              .format("DD/MM/YYYY")}`
        );
      return cuotas;
    }
  }

  estadoServicio(servicio) {
    const vencimientoEsFecha = !(typeof servicio.vencimiento === "number"); // vencimiento puede ser una fecha o una duracion
    const servicioVencido =
      vencimientoEsFecha && moment().isSameOrAfter(servicio.vencimiento);
    const sinCreditos = servicio.creditos === 0;
    if (servicioVencido || sinCreditos) {
      return "noDisponible";
    }
    return "disponible";
  }
}
