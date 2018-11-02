
import { Injectable } from '@angular/core';
import { Caja } from '../models/caja';
import * as Modelos from './httpModels';
import { HttpService } from './httpService';
@Injectable()
export class HttpServiceCaja {

	constructor(private httpService: HttpService) {

	}

	private cajaToBack({ tipoDePago, fecha, ...resto }: Caja) {
		return {
			tipoPago: tipoDePago,
			...resto
		};
	}

	public ingreso( ingreso: Caja ) {
		return this.httpService.post(
			new Modelos.Post('/caja/ingreso', this.cajaToBack(ingreso),
				'El ingreso fue realizado con exito',
				'Hubo un error al realizar el ingreso. Intente nuevamente.')
		);
	}

	public egreso( egreso: Caja ) {
		return this.httpService.post(
			new Modelos.Post('/caja/egreso', this.cajaToBack(egreso),
				'El egreso fue realizado con exito',
				'Hubo un error al realizar el egreso. Intente nuevamente.')
		);
	}


	public traerTodos(fechaInicio: any, fechaFin: any) {
		return this.httpService.mapper(
		this.httpService.post(
			new Modelos.Post('/caja/movimientos', {fechaInicio: fechaInicio, fechaFin: fechaFin},
			null,
					'Hubo un error al traer los movimientos. Intente nuevamente.')),
			(movimientos) => movimientos.map(
				({ ingreso, egreso, tipo_pago, ...resto }) => ({ tipoDePago: tipo_pago, monto: ingreso + egreso, tipo: (egreso > 0) ? 'egreso' : 'ingreso', ...resto })
			)
		);
	}

}
