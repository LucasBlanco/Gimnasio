import {Component, OnInit, AfterViewInit, ViewChild, Input} from '@angular/core';
import {HttpServiceSocios} from "../../../../services/htppServiceSocios";
import {Caja} from "../../../../models/caja";
import {TablaComponent} from "../../shared-components/tabla/tabla.component";

@Component({
	selector: 'm-tabla-movimientos',
	template: `
		<div class="m-portlet m-portlet--success m-portlet--head-solid-bg">
			<div class="m-portlet__head">
				<div class="m-portlet__head-caption">
					<div class="m-portlet__head-title">
        			<span class="m-portlet__head-icon">
          				<i class="flaticon-edit"></i>
        			</span>
						<h3 class="m-portlet__head-text">
							Movimientos
						</h3>
					</div>
				</div>
			</div>
			<div class="m-portlet__body">
				<m-tabla [datos]="tabla.datos"></m-tabla>
			</div>
		</div>`
})
export class TablaMovimientosComponent implements AfterViewInit, OnInit {

	@Input() movimientos: Array<Caja> = []
	@ViewChild(TablaComponent) tabla: TablaComponent

	constructor( private httpService: HttpServiceSocios) {

	}
	ngOnInit() {
		// this.socios = [new Socio('Carlos', 'Garcia', 'cgarcia@email.com', '2018-05-15', 123, 'mensual', 123,)]
		this.movimientos= [new Caja(100, 'Bebida', 'es roja y tiene burbujitas', 'efectivo', 'Ingreso')]
		/*this.httpService.getSocios().then(movimientos => {
			(this.movimientos as any) = movimientos
		})*/
	}

	ngAfterViewInit() {
		this.tabla.datos = this.movimientos
		this.tabla.nombreColumnas = ['Tipo', 'Concepto', 'Monto', 'Observacion', 'Tipo de pago']
		this.tabla.valorColumnas = ['tipo', 'concepto', 'monto', 'observacion', 'tipoDePago']
	}

}
