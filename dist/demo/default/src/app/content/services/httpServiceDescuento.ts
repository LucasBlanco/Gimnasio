
import * as Modelos from './httpModels';
import {HttpService} from "./httpService";
import {Descuento} from "../models/descuento";
import {Injectable} from "@angular/core";

@Injectable()
export class HttpServiceDescuento {

	constructor(private httpService: HttpService) {}

	private descuentoToFront(descuento){
		return  new Descuento(descuento.nombre, descuento.vencimiento_dias, descuento.porcentaje, descuento.aplicable_enconjunto === 1, descuento.id)
	}

	public descuentoToBack({vencimiento, aplicableEnConjunto, ...resto}){
		return {
			...resto,
			vencimiento_dias: vencimiento,
			aplicable_enconjunto: aplicableEnConjunto
		}

	}

	public crear( descuento: Descuento){
		delete descuento.id;
		return this.httpService.post(
			new Modelos.Post("/descuento/crear", this.descuentoToBack(descuento),
				"El descuento fue creado con exito",
				"Hubo un error al crear el descuento. Intente nuevamente.")
		)
	}

	public editar( descuento: Descuento ) {
		return this.httpService.put(
			new Modelos.Post("/descuento/editar/" + descuento.id, this.descuentoToBack(descuento),
				"El descuento fue editado con exito",
				"Hubo un error al editar el descuento. Intente nuevamente.")
		)
	}

	public borrar(descuento: Descuento) {
		return this.httpService.post(
			new Modelos.Post("/descuento/borrar/", {id: descuento.id},
				"El descuento fue eliminado con exito",
				"Hubo un error al eliminar el descuento. Intente nuevamente.")
		)
	}

	public traerTodos(): Promise<any>{
		return this.httpService.mapper(
			this.httpService.get(
				new Modelos.Get("/descuento/all",
					"Hubo un error al traer los descuentos. Intente nuevamente.")
			),
			(descuentos) => descuentos.map(descuento => this.descuentoToFront(descuento))
		)
	}

	public traerUno(descuento: Descuento): Promise<any>{
		return this.httpService.mapper(
			this.httpService.get(
				new Modelos.Get("/descuento/find/"+ descuento.id,
					"Hubo un error al traer el descuento. Intente nuevamente.")
			),
			(_descuento) => this.descuentoToFront(_descuento)
		)
	}
}
