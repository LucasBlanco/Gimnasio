import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  ViewChild,
  Input
} from "@angular/core";
import { Socio, SocioBuilder } from "../../../../models/socio";
import { HttpServiceSocios } from "../../../../services/httpServiceSocios";
import { SociosService } from "../serviceSocio";
import { HttpServiceMembresia } from "../../../../services/httpServiceMembresia";
import { Membresia } from "../../../../models/membresia";
import { Descuento } from "../../../../models/descuento";
import { ModalSelect } from "../../shared-components/modalSingleElement/modalSelect.component";
import * as Modelos from "../../../../models/generales";
import { ActivatedRoute } from "@angular/router";
import { t } from "@angular/core/src/render3";
import { Cuota } from "../../../../models/venta";
declare var $: any;
@Component({
  selector: "m-compras",
  templateUrl: "./compras.component.html"
})
export class ComprasComponent implements OnInit {
  @Input() socio: Socio = new SocioBuilder().empty();

  membresias: (Membresia & { cuotas: Cuota[] })[] = []; // cuotas por si es una membresia en cuotas y se debe pagar una cuota N
  membresiasSelec: (Membresia & { cuotas: Cuota[] })[] = [];
  tipoDePago: string;
  observacion: string;
  abonaCon: number = null;
  @ViewChild(ModalSelect) modalSelect;

  constructor(
    private activatedRouter: ActivatedRoute,
    private httpSrvSocio: HttpServiceSocios,
    private httpServiceMembresia: HttpServiceMembresia,
    private srvSocio: SociosService
  ) {}

  ngOnInit() {
    this.iniciar();
  }

  iniciar() {
    this.activatedRouter.params.subscribe(params => {
      this.socio = new SocioBuilder().empty();
      this.membresias = [];
      this.membresiasSelec = [];
      this.srvSocio.changeIdSocio(+params["id"]);
      this.httpSrvSocio.getSubscription().subscribe(socios => {
        this.socio =
          socios.find(s => s.id === this.srvSocio.idSocio) ||
          new SocioBuilder().empty();
        this.seleccionarMembresias();
      });
      this.httpServiceMembresia.getSubscription().subscribe(membresias => {
        this.membresias = membresias.map(m => ({ ...m })); // Para cambiar la referencia a la membresia y no modificarla
        this.seleccionarMembresias();
      });
    });
  }
  public update() {
    this.membresias.forEach(cm => {
      cm.descuento = null;
    });
  }

  seleccionarMembresias() {
    if (this.socio.id !== undefined && this.membresias.length > 0) {
      const ventas = this.socio.ventas;
      if (ventas) {
        this.membresiasSelec = this.membresias.filter(m =>
          ventas.some(v => m.id === v.membresia.id)
        );
        this.membresiasSelec.forEach(m => {
          const venta = ventas.find(v => v.membresia.id === m.id);
          m.descuento = venta.descuentoMembresia;
          if (m.nroCuotas > 1) {
            m.precio =
              venta.precio / (venta.descuentoMembresia.porcentaje / 100); // para volver al precio orginal de la membresia y que cuando se aplique el descuento seapraezca el precio de venta
            m.cuotas = venta.cuotas;
          }
        });
      }
    }
  }

  comprar() {
    this.httpSrvSocio.comprar(
      this.socio.id,
      this.tipoDePago,
      this.observacion,
      this.membresiasSelec
    );
  }

  agregarDescuento(membresia: Membresia) {
    console.log(this.membresias);
  }

  calcularTotal() {
    return this.membresiasSelec.reduce(
      (a, b) => a + this.calcularTotalParcial(b),
      0
    );
  }

  descuentoSocio(membresia) {
    if (!membresia || ! this.socio.descuento) {
      return null;
    }
    const descuento: Descuento = membresia.descuentosDisponibles.find(
      d => d.tipo === "socio" && d.id === this.socio.descuento.id
    );
    let precio = 0;
    if (!descuento) {
      return null;
    }
    if (!membresia.descuento) {
      precio = (membresia.precio * descuento.porcentaje) / 100;
      return { descuento: descuento, precio: precio };
    }
    if (
      descuento.aplicableEnConjunto ||
      membresia.descuento.aplicableEnConjunto
    ) {
      const precioConDescuentoMembresia =
        membresia.precio -
        (membresia.precio * membresia.descuento.porcentaje) / 100;
      precio = (precioConDescuentoMembresia * descuento.porcentaje) / 100;
    } else {
      precio = (membresia.precio * descuento.porcentaje) / 100;
    }
    return { descuento: descuento, precio: precio };
  }

  descuentoMembresia(membresia) {
    return membresia.descuento
      ? (membresia.precio * membresia.descuento.porcentaje) / 100
      : 0;
  }

  calcularTotalParcial(membresia) {
    const descuentoMembresia = this.descuentoMembresia(membresia);
    const descuentoSocio = this.descuentoSocio(membresia)
      ? this.descuentoSocio(membresia).precio
      : 0;
    return membresia.precio - descuentoMembresia - descuentoSocio;
  }

  membresiaConDescuento(membresia) {
    return membresia.descuento !== null;
  }

  calcularPrecioConDescuento(membresia) {
    const descuentoMembresia = this.descuentoMembresia(membresia);
    return membresia.precio - descuentoMembresia;
  }

  tipoDescuento(membresia: Membresia) {
    const descMemb = "Descuento de membresia";
    const descCuotas = "Descuento por cuotas";
    if (membresia.descuento && membresia.nroCuotas > 2) {
      return `${descMemb}<br /> ${descCuotas}`;
    } else {
      return membresia.descuento ? descMemb : descCuotas;
    }
  }

  agregarMembresia = membresia => {
    this.membresiasSelec = [...this.membresiasSelec, membresia];
    console.log(this.membresiasSelec);
  };

  eliminarMembresia = (membresia: Membresia) => {
    this.membresiasSelec = this.membresiasSelec.filter(m => m !== membresia);
    console.log(this.membresiasSelec);
  };

  estaSeleccionada(membresia: Membresia) {
    return this.membresiasSelec.some(m => m.id === membresia.id);
  }
}
