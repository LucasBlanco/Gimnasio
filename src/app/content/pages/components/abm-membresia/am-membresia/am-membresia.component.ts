import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";
import { Membresia, MembresiaBuilder } from "../../../../models/membresia";
import { Servicio } from "../../../../models/servicio";
import { Descuento } from "../../../../models/descuento";
import { HttpServiceServicio } from "../../../../services/httpServiceServicio";
import { HttpServiceDescuento } from "../../../../services/httpServiceDescuento";

@Component({
  selector: "m-am-membresia",
  templateUrl: "./am-membresia.component.html"
})
export class AmMembresiaComponent implements OnChanges, OnInit {
  MembresiaBuilder = new MembresiaBuilder();
  @Input() membresiaAModificar: Membresia = this.MembresiaBuilder.empty();
  @Input() editando: boolean = false;
  @Output("alta") altaEmitter = new EventEmitter<Membresia>();
  @Output("modificar") modificacionEmitter = new EventEmitter<Membresia>();
  @Output("mostrarTabla") irALaTablaEmitter = new EventEmitter<void>();
  membresia: Membresia = this.MembresiaBuilder.empty();
  servicios: ({
    seleccionado: boolean;
    creditos: number;
    vencimiento: number;
  } & Servicio)[] = [];
  descSocioSelec: Array<Descuento> = [];
  descSocio: Array<Descuento> = [];
  descMembSelec: Array<Descuento> = [];
  descMemb: Array<Descuento> = [];

  constructor(
    private servicioSrv: HttpServiceServicio,
    private descuentoSrv: HttpServiceDescuento
  ) {}

  ngOnInit() {
    this.servicioSrv.getSubscription().subscribe(servicios => {
      this.servicios = servicios.map(x => ({
        seleccionado: false,
        creditos: null,
        vencimiento: null,
        ...x
      }));
      if (this.editando) {
        this.membresiaAModificar.servicios.forEach(srv => {
          const servicio = this.servicios.find(s => s.id === srv.id);
          servicio.seleccionado = true;
          servicio.vencimiento = srv.vencimiento;
          servicio.creditos = srv.creditos;
        });
      }
    });

    this.descuentoSrv.getSubscription().subscribe(descuentos => {
      this.descSocio = descuentos.filter(d => d.tipo === "socio");
      this.descMemb = descuentos.filter(d => d.tipo === "membresia");
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.membresia = this.editando
      ? this.membresiaAModificar
      : this.MembresiaBuilder.empty();
    this.servicios.forEach(s => {
      s.seleccionado = false;
      s.creditos = null;
      s.vencimiento = null;
    });
  }

  borrar() {
    this.membresia = this.MembresiaBuilder.empty();
    this.servicios.forEach(s => {
      s.seleccionado = false;
      s.creditos = null;
      s.vencimiento = null;
    });
  }

  irALaTabla() {
    this.irALaTablaEmitter.emit();
  }

  enviarEvento() {
    this.membresia.servicios = this.servicios
      .filter(x => x.seleccionado)
      .map(({ seleccionado, ...x }) => x);
    this.membresia.descuentosDisponibles = [
      ...this.descMembSelec,
      ...this.descSocioSelec
    ];
    if (!this.editando) {
      this.altaEmitter.emit(this.membresia);
    } else {
      this.modificacionEmitter.emit(this.membresia);
    }
    this.borrar();
  }

  actualizarVencimientoServicios = vencimiento =>
    this.servicios.forEach(s => (s.vencimiento = vencimiento));

  hayUnServicioSeleccionado = () => this.servicios.some(s => s.seleccionado);
}
