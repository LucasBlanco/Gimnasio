import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {Socio} from '../../../../models/socio';
import {TablaComponent} from '../../shared-components/tabla/tabla.component';

@Component({
	selector: 'm-tabla-socios',
	template: `
		<div class="m-portlet m-portlet--success m-portlet--head-solid-bg">
			<div class="m-portlet__head">
				<div class="m-portlet__head-caption">
					<div class="m-portlet__head-title">
        			<span class="m-portlet__head-icon">
          				<i class="flaticon-edit"></i>
        			</span>
						<h3 class="m-portlet__head-text">
							Tabla de usuarios
						</h3>
					</div>
				</div>
			</div>
			
			<div class="m-portlet__body">
				<m-tabla [nombreColumnas]="['/*Nombre', 'Apellido']" [valorColumnas]="['nombre', 'apellido']" [datos]="socios" [acciones]="acciones"></m-tabla>
			</div>
		</div>`
})
export class TablaSociosComponent implements OnInit{

	@Input() socios: Array<Socio> = []
	@Output('modificar') emitModificacion: EventEmitter<Socio> = new EventEmitter()
	acciones

	 ngOnInit(){
		this.acciones = [
			{
				callback: this.enviarModificacion.bind(this),
				class: 'la la-edit',
				name: 'Modificar'
			}
		]
	}

	enviarModificacion(socio: Socio) {
		this.emitModificacion.emit(socio)
	}
}
