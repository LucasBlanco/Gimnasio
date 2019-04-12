import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Servicio } from '../../../../models/servicio';
import { Tabla } from '../../abm/tabla';

@Component({
	selector: 'm-tabla-servicio',
	template: `
		<div class="m-portlet m-portlet--success m-portlet--head-solid-bg">
			<div class="m-portlet__head">
				<div class="m-portlet__head-caption">
					<div class="m-portlet__head-title">
        			<span class="m-portlet__head-icon">
          				<i style="font-size: 2.2rem;" class="flaticon2-kettlebell"></i>
        			</span>
						<h3 class="m-portlet__head-text">
							Tabla de servicios
						</h3>
					</div>
				</div>
			</div>
			<div class="m-portlet__body">
				<m-tabla [nombreColumnas]="['/*Nombre']" [valorColumnas]="['nombre']" [datos]="datos" [acciones]="acciones"></m-tabla>
			</div>
		</div>`
})
export class TablaServicioComponent extends Tabla {

	
}
