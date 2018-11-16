
import * as Modelos from './httpModels';
import {HttpService} from './httpService';
import {Descuento} from '../models/descuento';
import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class HttpServiceDescuento {

	subject = new BehaviorSubject<Descuento[]>([]);
	datos: Descuento[] = []

	constructor(private httpService: HttpService) {
		this.traerTodos().then(datos => {
			this.datos = datos;
			this.updateObservers();
		});
	}

	private updateObservers() {
		this.subject.next(this.datos);
	}

	public getSubscription(): Observable<any> {
		return this.subject.asObservable();
	}

	public descuentoToFront(descuento) {
		return  new Descuento(descuento.nombre, descuento.vencimiento_dias, descuento.porcentaje, descuento.aplicable_enconjunto === 1, (descuento.tipo ===1)? 'membresia':'socio', descuento.id);
	}

	public descuentoToBack({vencimiento, aplicableEnConjunto, tipo, ...resto}) {
		return {
			...resto,
			tipo: (tipo === 'membresia') ? 1 : 2,
			vencimiento_dias: vencimiento,
			aplicable_enconjunto: aplicableEnConjunto
		};

	}

	public crear( descuento: Descuento) {
		delete descuento.id;
		return this.httpService.post(
			new Modelos.Post('/descuento/crear', this.descuentoToBack(descuento),
				'El descuento fue creado con exito',
				'Hubo un error al crear el descuento. Intente nuevamente.')
		).then(() => {
			this.datos.push(descuento);
			this.updateObservers()
		});
	}

	public editar( descuento: Descuento ) {
		return this.httpService.put(
			new Modelos.Post('/descuento/editar/' + descuento.id, this.descuentoToBack(descuento),
				'El descuento fue editado con exito',
				'Hubo un error al editar el descuento. Intente nuevamente.')
		).then(() => {
			this.datos = this.datos.map(_descuento => (_descuento.id === descuento.id) ? descuento : _descuento);
			this.updateObservers()
		});
	}

	public borrar(descuento: Descuento) {
		return this.httpService.post(
			new Modelos.Post('/descuento/borrar/', {id: descuento.id},
				'El descuento fue eliminado con exito',
				'Hubo un error al eliminar el descuento. Intente nuevamente.')
		).then(() => { this.datos = this.datos.filter(srv => srv.id !== descuento.id); this.updateObservers()});
	}

	public traerTodos(): Promise<any> {
		return this.httpService.mapper(
			this.httpService.get(
				new Modelos.Get('/descuento/all',
					'Hubo un error al traer los descuentosDisponibles. Intente nuevamente.')
			),
			(descuentos) => descuentos.map(descuento => this.descuentoToFront(descuento))
		);
	}

	public traerUno(descuento: Descuento): Promise<any> {
		return this.httpService.mapper(
			this.httpService.get(
				new Modelos.Get('/descuento/find/' + descuento.id,
					'Hubo un error al traer el descuento. Intente nuevamente.')
			),
			(_descuento) => this.descuentoToFront(_descuento)
		);
	}
}
