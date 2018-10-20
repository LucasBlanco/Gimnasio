
import * as Modelos from './httpModels';
import {HttpService} from "./httpService";
import {Servicio} from "../models/servicio";
import {Injectable} from "@angular/core";
@Injectable()
export class HttpServiceServicio {

	constructor(private httpService: HttpService) {}

	private getID = (dia) => ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'].findIndex(_dia => _dia === dia) +1;
	private getDia = (id) => ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'].find((_dia, i) => i+1 === id);

	public servicioToFront(servicio){
		let dias = [];
		if(servicio.dias){
			dias = servicio.dias.map( dia =>
				({
					dia: this.getDia(dia.id),
				horaInicio: dia.pivot.desde,
				horaFin: dia.pivot.hasta,
				entradaDesde: dia.pivot.entrada_desde,
				entradaHasta: dia.pivot.entrada_hasta
				})
			)
		}
		return  new Servicio(servicio.nombre, dias, servicio.id)
	}

	private servicioToBack({horarios, ...resto}){

		let dias = horarios.map( horario =>
			({
				id: this.getID(horario.dia),
				desde: horario.horaInicio,
				hasta: horario.horaFin,
				entrada_desde: horario.entradaDesde,
				entrada_hasta: horario.entradaHasta
			})
		);
		return {
				...resto,
			dias: dias,
		}

	}

	public crear( servicio: Servicio){
		delete servicio.id;
		return this.httpService.post(
			new Modelos.Post("/servicio/crear", this.servicioToBack(servicio),
				"El servicio fue creado con exito",
				"Hubo un error al crear el servicio. Intente nuevamente.")
		)
	}

	public editar( servicio: Servicio ) {
		return this.httpService.put(
			new Modelos.Post("/servicio/editar/" + servicio.id, this.servicioToBack(servicio),
				"El servicio fue editado con exito",
				"Hubo un error al editar el servicio. Intente nuevamente.")
		)
	}

	public borrar(servicio: Servicio) {
		return this.httpService.post(
			new Modelos.Post("/servicio/borrar/", {id: servicio.id},
				"El servicio fue eliminado con exito",
				"Hubo un error al eliminar el servicio. Intente nuevamente.")
		)
	}

	public traerTodos(): Promise<Array<Servicio>>{
		return this.httpService.mapper(
			this.httpService.get(
				new Modelos.Get("/servicio/all",
					"Hubo un error al traer los servicios. Intente nuevamente.")
			),
			(servicios) => servicios.map(servicio => this.servicioToFront(servicio))
		)
	}

	public traerUno(servicio: Servicio): Promise<Servicio>{
		return this.httpService.mapper(
			this.httpService.get(
				new Modelos.Get("/servicio/find/"+ servicio.id,
					"Hubo un error al traer el servicio. Intente nuevamente.")
			),
			(_servicio) => this.servicioToFront(_servicio)
		)
	}
}
