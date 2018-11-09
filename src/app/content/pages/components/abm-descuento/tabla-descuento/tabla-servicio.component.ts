import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Descuento} from "../../../../models/descuento";

@Component({
  selector: 'm-tabla-descuento',
	template: `
		<div class="m-portlet m-portlet--success m-portlet--head-solid-bg">
			<div class="m-portlet__head">
				<div class="m-portlet__head-caption">
					<div class="m-portlet__head-title">
        			<span class="m-portlet__head-icon">
          				<i class="flaticon-edit"></i>
        			</span>
						<h3 class="m-portlet__head-text">
							Tabla de descuentos
						</h3>
					</div>
				</div>
			</div>
			
			<div class="m-portlet__body">
				<m-tabla [nombreColumnas]="['/*Nombre', '/*Porcentaje', 'Vencimiento', '/AEC']" 
				[valorColumnas]="['nombre', 'porcentaje', 'vencimiento', 'aplicableEnConjunto']" 
				[datos]="descuentos" [acciones]="acciones"></m-tabla>
			</div>
		</div>`
})
export class TablaDescuentoComponent implements OnInit {
	@Input() descuentos: Array<Descuento>;
	@Output('modificar') emitModificacion: EventEmitter<Descuento> = new EventEmitter();
	@Output('baja') emitBaja: EventEmitter<Descuento> = new EventEmitter()
	acciones;

  ngOnInit() {
	  this.acciones = [
		  {
			  callback: this.enviarModificacion.bind(this),
			  class: 'la la-edit',
			  name: 'Modificar'
		  },
		  {
			  callback: this.enviarBaja.bind(this),
			  class: 'la la-trash',
			  name: 'Eliminar'
		  }
	  ]
  }

	enviarModificacion(descuento: Descuento) {
		this.emitModificacion.emit(descuento)
	}

	enviarBaja(descuento: Descuento){
  		this.emitBaja.emit(descuento)
	}

}
