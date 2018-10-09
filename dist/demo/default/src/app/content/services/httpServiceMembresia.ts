
import * as Modelos from './httpModels';
import {HttpService} from "./httpService";
import {Membresia} from "../models/membresia";
import {Injectable} from "@angular/core";
import {Servicio} from '../models/servicio';
import {Descuento} from "../models/descuento";

@Injectable()
export class HttpServiceMembresia {

	constructor(private httpService: HttpService) {}

	private membresiaToFront(membresia){
		return  new Membresia(
			membresia.nombre,
			membresia.precio,
			membresia.vencimiento_dias,
			membresia.nro_cuotas,
			membresia.servicios && membresia.servicios.map(srv => {
				 return {creditos: srv.pivot.creditos, vencimiento: srv.pivot.vto, servicio: new Servicio(srv.nombre, null, srv.id)}
			}),
			membresia.descuentos && membresia.descuentos.map( desc => {
				return new Descuento(desc.nombre, desc.vencimiento_dias, desc.porcentaje, desc.aplicable_enconjunto, desc.id)
			}),
			membresia.id
		)
	}

	private membresiaToBack({vencimiento, nroCuotas, servicios, descuentos, ...resto}){
		return {
			...resto,
			servicios: servicios.map( srv => ({id: srv.servicio.id, cantidadCreditos: (srv.creditos)? srv.creditos:null , vto: srv.vencimiento})),
			descuentos: descuentos.map( d => d.id),
			vencimiento_dias: vencimiento,
			nro_cuotas: nroCuotas
		}
	}

	public crear( membresia: Membresia) {
		delete membresia.id
		return this.httpService.post(
			new Modelos.Post("/membresia/crear", this.membresiaToBack(membresia),
				"La membresia fue creada con exito",
				"Hubo un error al crear la membresia. Intente nuevamente.")
		)
	}

	public editar( membresia: Membresia ) {
		return this.httpService.put(
			new Modelos.Post("/membresia/editar/" + membresia.id, this.membresiaToBack(membresia),
				"La membresia fue editada con exito",
				"Hubo un error al editar la membresia. Intente nuevamente.")
		)
	}

	public borrar(membresia: Membresia) {
		return this.httpService.post(
			new Modelos.Post("/membresia/borrar/", membresia.id,
				"La membresia fue eliminada con exito",
				"Hubo un error al eliminar la membresia. Intente nuevamente.")
		)
	}

	public traerTodos(): Promise<any>{
		return this.httpService.mapper(
			this.httpService.get(
				new Modelos.Get("/membresia/all",
					"Hubo un error al traer las membresias. Intente nuevamente.")
			),
			(membresias) => membresias.map(membresia => this.membresiaToFront(membresia))
		)
	}

	public traerUno(membresia: Membresia): Promise<any>{
		return this.httpService.mapper(
			this.httpService.get(
				new Modelos.Get("/membresia/find/"+ membresia.id,
					"Hubo un error al traer la membresia. Intente nuevamente.")
			),
			(_membresia) => this.membresiaToFront(_membresia)
		)
	}
}
