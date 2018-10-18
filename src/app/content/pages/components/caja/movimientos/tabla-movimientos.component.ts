import {Component, OnInit, AfterViewInit, Input} from '@angular/core';
import { HttpServiceCaja } from '../../../../services/httpServiceCaja'
import {Caja} from "../../../../models/caja";

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
				<m-tabla [datos]="movimientos" [nombreColumnas]="['Tipo', 'Concepto', 'Monto', 'Observacion', 'Tipo de pago']"
						 [valorColumnas]="['tipo', 'concepto', 'monto', 'observacion', 'tipoDePago']"
				></m-tabla>
			</div>
		</div>`
})
export class TablaMovimientosComponent implements AfterViewInit, OnInit {

	@Input() movimientos: Array<Caja> = []

	constructor( private cajaSrv: HttpServiceCaja) {

	}
	ngOnInit() {
		// this.socios = [new Socio('Carlos', 'Garcia', 'cgarcia@email.com', '2018-05-15', 123, 'mensual', 123,)]
		this.movimientos= [new Caja(100, 'Bebida', 'es roja y tiene burbujitas', 'efectivo')]
		/*this.httpService.getSocios().then(movimientos => {
			(this.movimientos as any) = movimientos
		})*/
	}

	ngAfterViewInit() {
		this.cajaSrv.traerTodos('10-10-2018', '15-10-18').then( response => (this.movimientos as any) = response)
	}

}
