import {Component} from '@angular/core';
import { Tabla } from '../../abm/tabla';

@Component({
  selector: 'm-tabla-descuento',
	template: `
		<div class="m-portlet m-portlet--success m-portlet--head-solid-bg">
			<div class="m-portlet__head">
				<div class="m-portlet__head-caption">
					<div class="m-portlet__head-title">
        			<span class="m-portlet__head-icon">
          				<i style="font-size: 2.2rem;" class="flaticon-tag"></i>
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
				[datos]="datos" [acciones]="acciones"></m-tabla>
			</div>
		</div>`
})
export class TablaDescuentoComponent extends Tabla {
	

}
