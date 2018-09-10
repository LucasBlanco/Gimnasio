
import * as Modelos from './httpModels';
import {Socio} from "../models/socio";
import {HttpService} from "./httpService";
import {Injectable} from "@angular/core";

@Injectable()
export class HttpServiceSocios {

	constructor(private httpService: HttpService) {

	}

	private mapSocio(socio: Socio){
		return {
			nombre: socio.nombre,
			apellido: socio.apellido,
			celular: socio.telefono,
			domicilio: socio.direccion,
			dni: socio.dni,
			fecha_nacimiento: socio.fechaNacimiento
		}
	}

	public postSocio(socio: Socio) {
		return this.httpService.post(
			new Modelos.Post("/socio/crear", this.mapSocio(socio),
			"El socio fue creado con exito",
			"Hubo un error al crear el socio. Intente nuevamente.")
		)
	}

	public getSocios() {
		return this.httpService.get(
			new Modelos.Get("/socio/all",
			"Hubo un error al traer los socios. Intente nuevamente.")
		)
	}

	public getSocio(id: number){
		return this.httpService.get(
			new Modelos.Get("/socio/editar/"+ id,
				"Hubo un error al traer el socio. Intente nuevamente.")
		)
	}
	public postCobrarSocio(socio: Socio){
		return this.httpService.post(
			new Modelos.Post("/socio/comprar", this.mapSocio(socio),
				"La compra fue realizada exitosamente",
				"Hubo un error al realizar la compra. Intente nuevamente.")
		)
	}
}
