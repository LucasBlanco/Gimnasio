import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Servicio } from '../../../../models/servicio';

@Component({
	selector: 'm-tabla-servicio',
	template: `
		<div class="m-portlet m-portlet--success m-portlet--head-solid-bg">
			<div class="m-portlet__head">
				<div class="m-portlet__head-caption">
					<div class="m-portlet__head-title">
        			<span class="m-portlet__head-icon">
          				<i style="font-size: 2.2rem;" class="flaticon-kettlebell"></i>
        			</span>
						<h3 class="m-portlet__head-text">
							Tabla de servicios
						</h3>
					</div>
				</div>
			</div>
			<div class="m-portlet__body">
				<m-tabla [nombreColumnas]="['/*Nombre']" [valorColumnas]="['nombre']" [datos]="servicios" [acciones]="acciones"></m-tabla>
			</div>
		</div>`
})
export class TablaServicioComponent implements OnInit {
	@Input() servicios: Array<Servicio>;
	@Output('modificar') emitModificacion: EventEmitter<Servicio> = new EventEmitter();
	@Output('baja') emitBaja: EventEmitter<Servicio> = new EventEmitter();
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
		];
	}

	enviarModificacion(servicio: Servicio) {
		this.emitModificacion.emit(servicio);
	}

	enviarBaja(servicio: Servicio) {
		this.emitBaja.emit(servicio);
	}

}
