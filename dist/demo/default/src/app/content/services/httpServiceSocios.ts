
import * as Modelos from './httpModels';
import {Socio} from "../models/socio";
import {Membresia} from "../models/membresia";
import {HttpService} from "./httpService";
import {Injectable} from "@angular/core";
import {Descuento} from '../models/descuento';

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
			id_descuento: socio.descuento.id,
			dni: socio.dni,
			fecha_nacimiento: socio.fechaNacimiento
		}
	}

	private socioToFront(socio): Socio{
		return new Socio(
			socio.nombre,
			socio.apellido,
			new Descuento(
				socio.descuento && socio.descuento.nombre,
				socio.descuento && socio.descuento.vencimiento_dias,
				socio.descuento && socio.descuento.porcentaje,
				socio.descuento && socio.descuento.aplicableEnConjunto,
				socio.descuento && socio.descuento.id || socio.id_descuento
			),
			socio.fecha_nacimiento,
			socio.dni,
			socio.celular,
			socio.domicilio,
			socio.genero,
			socio.id)
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
		return this.httpService.put(
			new Modelos.Post("/socio/editar/" + socio.id, this.socioToBack(socio),
				"El socio fue modificado con exito",
				"Hubo un error al modificar el socio. Intente nuevamente.")
		)
	}


	public traerTodos(): Promise<any> {
		return this.httpService.mapper(
			this.httpService.get(new Modelos.Get("/socio/all", "Hubo un error al traer los socios. Intente nuevamente.")),
				(socios) => (socios.map(socio => this.socioToFront(socio)))
		)
	}

	public traerUno(socio: Socio, id?:number): Promise<any>{
		return this.httpService.mapper(
			this.httpService.get(new Modelos.Get("/socio/find/"+ ((id)? id : socio.id), "Hubo un error al traer el socio. Intente nuevamente.")),
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
