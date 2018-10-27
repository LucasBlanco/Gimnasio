
import * as Modelos from './httpModels';
import {Socio} from '../models/socio';
import {Membresia} from '../models/membresia';
import {HttpService} from './httpService';
import {Injectable} from '@angular/core';
import {Descuento} from '../models/descuento';
import {HttpServiceMembresia} from './httpServiceMembresia';
import {HttpServiceDescuento} from './httpServiceDescuento';
import {HttpServiceServicio} from './httpServiceServicio';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class HttpServiceSocios {

	subjectSocios = new BehaviorSubject<Socio[]>([]);
	socios: Socio[] = [];

	constructor(private httpService: HttpService, private membresiaSrv: HttpServiceMembresia, private descuentoSrv: HttpServiceDescuento, private servicioSrv: HttpServiceServicio) {
		this.traerTodos().then(socios => {
			this.socios = socios;
			this.updateSociosObservers();
		});
	}

	public getSociosSubscription(): Observable<any> {
		return this.subjectSocios.asObservable();
	}

	private updateSociosObservers() {
		this.subjectSocios.next(this.socios);
	}

	private socioToBack(socio: Socio) {
		return {
			nombre: socio.nombre,
			apellido: socio.apellido,
			celular: socio.telefono,
			domicilio: socio.direccion,
			id_descuento: socio.descuento && socio.descuento.id,
			genero: socio.genero,
			email: socio.email,
			dni: socio.dni,
			fecha_nacimiento: socio.fechaNacimiento
		};
	}

	private socioToFront(socio): Socio {
		return new Socio(
			socio.nombre,
			socio.apellido,
			new Descuento(
				socio.descuento && socio.descuento.nombre,
				socio.descuento && socio.descuento.vencimiento_dias,
				socio.descuento && socio.descuento.porcentaje,
				socio.descuento && socio.descuento.aplicableEnConjunto,
				socio.descuento && socio.descuento.tipo,
				socio.descuento && socio.descuento.id || socio.id_descuento
			),
			socio.fecha_nacimiento,
			socio.dni,
			socio.celular,
			socio.domicilio,
			socio.genero,
			socio.email,
			socio.id);
	}


	public crear(socio: Socio) {
		delete socio.id;
		return this.httpService.post(
			new Modelos.Post('/socio/crear', this.socioToBack(socio),
			'El socio fue creado con exito',
			'Hubo un error al crear el socio. Intente nuevamente.')
		).then( () => { this.socios.push(socio); this.updateSociosObservers(); });
	}

	public editar(socio: Socio) {
		return this.httpService.put(
			new Modelos.Post('/socio/editar/' + socio.id, this.socioToBack(socio),
				'El socio fue modificado con exito',
				'Hubo un error al modificar el socio. Intente nuevamente.')
		).then(() => { this.socios = this.socios.filter(s => s.id !== socio.id).concat([socio]); this.updateSociosObservers() });
	}

    public traerHistorial(miSocio: Socio) {
        return this.httpService.mapper(
         this.httpService.get(
            new Modelos.Get('/ventas/historialCompra/' + miSocio.id,
                'Hubo un error al traer el historial de compras. intente nuevamente')
        ), (response) => response.map(
                ({socio, membresia, descuento_membresia, descuento_socio, ...resto}) => ({
                    membresia: this.membresiaSrv.membresiaToFront(membresia),
						descuento_socio: descuento_socio && this.descuentoSrv.descuentoToFront(descuento_socio),
						descuento_membresia: descuento_membresia && this.descuentoSrv.descuentoToFront(descuento_membresia),
                        socio: this.socioToFront(socio),
                            ...resto
                })
            )
    );
    }

    public traerAccesos(miSocio: Socio) {
        return this.httpService.mapper(
            this.httpService.get(
                new Modelos.Get('/socio/accesos/' + miSocio.id,
                    'Hubo un error al traer los accesos. intente nuevamente')
			),
			(accesos) => accesos.map( ({created_at, servicio, ...resto}) => ({fecha: created_at, servicio: this.servicioSrv.servicioToFront(servicio)}))
            );
    }

	public traerTodos(): Promise<any> {
		return this.httpService.mapper(
			this.httpService.get(new Modelos.Get('/socio/all', 'Hubo un error al traer los socios. Intente nuevamente.')),
				(socios) => (socios.map(socio => this.socioToFront(socio)))
		);
	}

	public traerUno(socio: Socio, id?: number): Promise<any> {
		return this.httpService.mapper(
			this.httpService.get(new Modelos.Get('/socio/find/' + ((id) ? id : socio.id), 'Hubo un error al traer el socio. Intente nuevamente.')),
			(_socio) => this.socioToFront(_socio)
		);
	}

	public comprar(idSocio: number, tipoPago: string, membresias: Array<Membresia>) {
		const membresiasBack =  membresias.map(({id, descuento, ...resto}) => ({id: id, idDescuento: descuento && descuento.id, cantidad: 1}));
		return this.httpService.post(
			new Modelos.Post('/socio/comprar', {idSocio: idSocio, tipoPago: tipoPago, observacion: 'observacion', membresias: membresiasBack},
				'La compra fue realizada exitosamente',
				'Hubo un error al realizar la compra. Intente nuevamente.')
		);
	}

	public entrarAServicio(idSocio: number, idServicio: number) {
		return this.httpService.post(
			new Modelos.Post('/socio/registrarEntradaAServicio', {idSocio: idSocio, idServicio: idServicio},
				'La entrada fue registrada exitosamente',
				'Hubo un error al registrar la entrada. Intente nuevamente.')
		);
	}

}
