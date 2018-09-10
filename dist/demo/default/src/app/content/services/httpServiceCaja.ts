
import * as Modelos from './httpModels';
import {HttpService} from "./httpService";
import {Caja} from "../models/caja";

export class HttpServiceCaja {

	constructor(private httpService: HttpService) {

	}

	public postIngreso( ingreso: Caja ) {
		return this.httpService.post(
			new Modelos.Post("/caja/ingreso", ingreso,
				"El ingreso fue realizado con exito",
				"Hubo un error al realizar el ingreso Intente nuevamente.")
		)
	}

	public postEgreso( egreso: Caja ) {
		return this.httpService.post(
			new Modelos.Post("/caja/egreso", egreso,
				"El egreso fue realizado con exito",
				"Hubo un error al realizar el egreso Intente nuevamente.")
		)
	}

	public getMovimientos(){
		return this.httpService.get(
			new Modelos.Get("/caja/movimientos/",
				"Hubo un error al traer los movimientos. Intente nuevamente.")
		)
	}

}
