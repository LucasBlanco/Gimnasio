
import * as Modelos from './httpModels';
import {Socio} from "../models/socio";
import {Membresia} from "../models/membresia";
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
		return new Socio( socio.nombre, socio.apellido, socio.id_descuento, socio.fecha_nacimiento ,socio.dni , socio.celular, socio.domicilio, socio.id)
	}


	public crear(socio: Socio) {
		delete socio.id
		return this.httpService.post(
			new Modelos.Post("/socio/crear", this.socioToBack(socio),
			"El socio fue creado con exito",
			"Hubo un error al crear el socio. Intente nuevamente.")
		)
	}

	public editar(socio: Socio) {
		return this.httpService.post(
			new Modelos.Post("/socio/editar/" + socio.id, this.socioToBack(socio)['id'] = socio.id,
				"El socio fue creado con exito",
				"Hubo un error al crear el socio. Intente nuevamente.")
		)
	}


	public traerTodos(): Promise<any> {
		return this.httpService.mapper(
			this.httpService.get(new Modelos.Get("/socio/all", "Hubo un error al traer los socios. Intente nuevamente.")),
				(socios) => (socios.map(socio => this.socioToFront(socio)))
		)
	}

	public traerUno(socio: Socio): Promise<any>{
		return this.httpService.mapper(
			this.httpService.get(new Modelos.Get("/socio/find/"+ socio.id, "Hubo un error al traer el socio. Intente nuevamente.")),
			(_socio) => this.socioToFront(_socio)
		)
	}

	public comprar(id:number, tipoPago: string, membresias: Array<Membresia>){
		return this.httpService.post(
			new Modelos.Post("/socio/comprar",{idSocio: id, tipoPago: tipoPago, membresias: membresias},
				"La compra fue realizada exitosamente",
				"Hubo un error al realizar la compra. Intente nuevamente.")
		)
	}

	public entrarAServicio(idSocio:number, idServicio: number){
		return this.httpService.post(
			new Modelos.Post("/socio/registrarEntradaAServicio",{idSocio: idSocio, idServicio: idServicio},
				"La entrada fue registrada exitosamente",
				"Hubo un error al registrar la entrada. Intente nuevamente.")
		)
	}

}
