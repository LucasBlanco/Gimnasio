import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  OnInit
} from '@angular/core';
import { Socio, SocioBuilder } from '../../../../models/socio';
import { HttpServiceDescuento } from '../../../../services/httpServiceDescuento';
import { Descuento } from '../../../../models/descuento';

@Component({
  selector: 'm-am-socios',
  templateUrl: './am-socios.component.html'
})
export class AMSociosComponent implements OnChanges, OnInit {
  socio: Socio;
  SocioBuilder = new SocioBuilder();
  @Input() socioAModificar: Socio = this.SocioBuilder.empty();
  @Input() editando: boolean = false;
  @Output('alta') altaEmitter = new EventEmitter<Socio>();
  @Output('modificar') modificacionEmitter = new EventEmitter<Socio>();
  @Output('mostrarTabla') irALaTablaEmitter = new EventEmitter<void>();
  descuentos: Descuento[];

  constructor(private descuentoSrv: HttpServiceDescuento) {}

  ngOnInit() {
    this.descuentoSrv.getSubscription().subscribe(descuentos => {
      this.descuentos = descuentos.filter(d => d.tipo === 'socio');
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    this.socio = this.editando
      ? this.socioAModificar
      : this.SocioBuilder.empty();
  }

  borrarSocio() {
    this.socio = this.SocioBuilder.empty();
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
