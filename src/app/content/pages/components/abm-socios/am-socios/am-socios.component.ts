import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  OnInit
} from "@angular/core";
import { Socio, SocioBuilder } from "../../../../models/socio";
import { HttpServiceDescuento } from "../../../../services/httpServiceDescuento";
import { Descuento } from "../../../../models/descuento";
import { HttpServiceSocios } from "../../../../services/httpServiceSocios";

@Component({
  selector: "m-am-socios",
  templateUrl: "./am-socios.component.html"
})
export class AMSociosComponent implements OnChanges, OnInit {
  socio: Socio;
  @Input() socioAModificar: Socio = SocioBuilder.empty();
  @Input() editando: boolean = false;
  @Output("alta") altaEmitter = new EventEmitter<Socio>();
  @Output("modificar") modificacionEmitter = new EventEmitter<Socio>();
  @Output("mostrarTabla") irALaTablaEmitter = new EventEmitter<void>();
  descuentos: Descuento[];

  constructor(
    private descuentoSrv: HttpServiceDescuento,
    private socioSrv: HttpServiceSocios
  ) {}

  ngOnInit() {
    this.descuentoSrv.getSubscription().subscribe(descuentos => {
      this.descuentos = descuentos.filter(d => d.tipo === "socio");
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.editando) {
      this.socio = this.socioAModificar;
    } else {
      this.socio = SocioBuilder.empty();
      this.socioSrv
        .getSubscription()
        .subscribe(() => (this.socio.nroSocio = this.socioSrv.getProximoId()));
    }
  }

  borrarSocio() {
    this.socio = SocioBuilder.empty();
  }

  irALaTabla() {
    this.irALaTablaEmitter.emit();
  }

  enviarEvento() {
    if (!this.editando) {
      this.altaEmitter.emit(this.socio);
    } else {
      this.modificacionEmitter.emit(this.socio);
    }
    this.borrarSocio();
  }
}
