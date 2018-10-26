import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { HttpServiceCaja } from '../../../../services/httpServiceCaja';
import moment from 'moment';
import { Caja } from '../../../../models/caja';

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
				<form class="form-group m-form__group row" (submit)="filtrar(desde.value, hasta.value)" ngNativeValidate>
						<label class="col-lg-2 col-form-label">Fecha desde:</label>
						<div class="col-lg-3">
							<input type="date" class="form-control m-input" #desde required>
						</div>
						<label class="col-lg-2 col-form-label">Fecha hasta:</label>
						<div class="col-lg-3">
							<input type="date" class="form-control m-input" #hasta required>
						</div>
						<div class="col-auto">
						<button type="submit" class="btn btn-brand m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill" >
									<i class="la la-filter" style="color:white"></i>
								</button>
						</div>
					</form>
					
					<div class="m-separator m-separator--dashed m-separator--lg"></div>
				<m-tabla [datos]="movimientos" [nombreColumnas]="['Tipo', 'Concepto', 'Monto', 'Observacion', 'Tipo de pago']"
						 [valorColumnas]="['tipo', 'concepto', 'monto', 'observacion', 'tipoDePago']"
				></m-tabla>
			</div>
		</div>`
})
export class TablaMovimientosComponent implements AfterViewInit, OnInit {

	@Input() movimientos: Array<Caja> = [];

	constructor(private cajaSrv: HttpServiceCaja) {

	}
	ngOnInit() {

	}

	ngAfterViewInit() {
		const fechaDesde = moment().subtract(1, 'month').format('YYYY-MM-DD');
		const fechaHasta = moment().format('YYYY-MM-DD');
		this.cajaSrv.traerTodos(fechaDesde, fechaHasta).then(response => (this.movimientos as any) = response);
	}

	filtrar(desde, hasta){
		const fechaDesde = moment(desde).format('YYYY-MM-DD');
		const fechaHasta = moment(hasta).format('YYYY-MM-DD');
		this.cajaSrv.traerTodos(fechaDesde, fechaHasta).then(response => (this.movimientos as any) = response);
	}

}
