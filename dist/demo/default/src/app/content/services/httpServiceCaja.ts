
import * as Modelos from './httpModels';
import {HttpService} from "./httpService";
import {Caja} from "../models/caja";

export class HttpServiceCaja {

	constructor(private httpService: HttpService) {

	}

	public ingreso( ingreso: Caja ) {
		return this.httpService.post(
			new Modelos.Post("/caja/ingreso", ingreso,
				"El ingreso fue realizado con exito",
				"Hubo un error al realizar el ingreso. Intente nuevamente.")
		)
	}

	public egreso( egreso: Caja ) {
		return this.httpService.post(
			new Modelos.Post("/caja/ingreso", egreso,
				"El egreso fue realizado con exito",
				"Hubo un error al realizar el egreso. Intente nuevamente.")
		)
	}
	

	public traerTodos(fechaInicio: any, fechaFin: any){
		return this.httpService.post(
			new Modelos.Post("/caja/movimientos/", {fechaInicio: fechaInicio, fechaFin: fechaFin},
				"Hubo un error al traer los movimientos. Intente nuevamente.")
		)
	}

}
