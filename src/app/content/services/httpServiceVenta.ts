
import * as Modelos from './httpModels';
import { HttpService } from './httpService';
import { Injectable } from '@angular/core';
@Injectable()
export class HttpServiceCaja {

	constructor(private httpService: HttpService) {

	}

	public traerTodos(fechaInicio: any, fechaFin: any) {
		return this.httpService.post(
			new Modelos.Post('/ventas/all', { fechaDesde: fechaInicio, fechaHasta: fechaFin })
		)
	}

	public getClases() {
		return this.httpService.get(
			new Modelos.Get('/vendibles/clases',
				'Hubo un error al traer las clases. Intente nuevamente.')
		)
	}

	public getArticulos() {
		return this.httpService.get(
			new Modelos.Get('/vendibles/articulos',
				'Hubo un error al traer los articulos. Intente nuevamente.')
		)
	}

}
