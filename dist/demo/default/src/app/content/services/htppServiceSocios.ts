
import * as Modelos from './httpModels';
import {Socio} from "../models/socio";
import {HttpService} from "./httpService";
import {Injectable} from "@angular/core";

@Injectable()
export class HttpServiceSocios {

	constructor(private httpService: HttpService) {

	}

	private socioToBack(socio: Socio){
		return {
			nombre: socio.nombre,
			apellido: socio.apellido,
			celular: socio.telefono,
			domicilio: socio.direccion,
			id_descuento: socio.idDescuento,
			dni: socio.dni,
			fecha_nacimiento: socio.fechaNacimiento
		}
	}

	private socioToFront(socio): Socio{
		return new Socio( socio.nombre, socio.apellido, socio.id_descuento, socio.fecha_nacimiento ,socio.dni , socio.celular, socio.domicilio)

	}

	public postSocio(socio: Socio) {
		return this.httpService.post(
			new Modelos.Post("/socio/crear", this.socioToBack(socio),
			"El socio fue creado con exito",
			"Hubo un error al crear el socio. Intente nuevamente.")
		)
	}

	public  getSocios(): Promise<any> {
		return this.httpService.mapper(
			this.httpService.get(new Modelos.Get("/socio/all", "Hubo un error al traer los socios. Intente nuevamente.")),
				(socios) => (socios.map(socio => this.socioToFront(socio)))
		)
	}

	public getSocio(id: number){
		this.httpService.get(
			new Modelos.Get("/socio/editar/"+ id,
				"Hubo un error al traer el socio. Intente nuevamente.")
		)
	}
	public postCobrarSocio(socio: Socio){
		return this.httpService.post(
			new Modelos.Post("/socio/comprar", this.socioToBack(socio),
				"La compra fue realizada exitosamente",
				"Hubo un error al realizar la compra. Intente nuevamente.")
		)
	}
}
