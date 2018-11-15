import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Membresia } from '../../../../models/membresia';
import { Servicio } from '../../../../models/servicio';
import { Tabla } from '../../abm/tabla'

@Component({
	selector: 'm-tabla-membresia',
	template: `
		<div class="m-portlet m-portlet--success m-portlet--head-solid-bg">
			<div class="m-portlet__head">
				<div class="m-portlet__head-caption">
					<div class="m-portlet__head-title">
        			<span class="m-portlet__head-icon">
          				<i style="font-size: 2.2rem;" class="flaticon-staff"></i>
        			</span>
						<h3 class="m-portlet__head-text">
							Tabla de membresias
						</h3>
					</div>
				</div>
			</div>
			
			<div class="m-portlet__body">
				<m-tabla [nombreColumnas]="['/*Nombre', '/*Precio', 'Vencimiento']" [valorColumnas]="['nombre', 'precio', 'vencimiento']" [datos]="datos" [acciones]="acciones"></m-tabla>
			</div>
		</div>`
})
export class TablaMembresiaComponent extends Tabla implements OnInit  {

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

}
