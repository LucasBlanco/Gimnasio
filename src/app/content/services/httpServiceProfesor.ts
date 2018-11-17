
import * as Modelos from './httpModels';
import { HttpService } from './httpService';
import { Profesor } from '../models/profesor';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable()
export class HttpServiceProfesor {

    subject = new BehaviorSubject<Profesor[]>([]);
    datos: Profesor[] = []

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

    public profesorToFront({ nombre, apellido, email, telefono, domicilio, fijo, fecha_cobro_dia, cantidadad_dias_cobro, id }) {
        return new Profesor(nombre, apellido, email, telefono, domicilio, fijo, fecha_cobro_dia, cantidadad_dias_cobro, id);
    }

    private profesorToBack({ sueldo, diaCobro, intervaloCobro, ...resto }) {
        return { fijo: sueldo, fecha_cobro_dia: diaCobro, cantidad_dias_cobro: intervaloCobro, ...resto }
    }

    public crear(profesor: Profesor) {
        delete profesor.id;
        return this.httpService.post(
            new Modelos.Post('/profesor/crear', this.profesorToBack(profesor),
                'El profesor fue creado con exito',
                'Hubo un error al crear el profesor. Intente nuevamente.')
        ).then((id: number) => { profesor.id = id; this.datos.push(profesor); this.updateObservers() });
    }

    public editar(profesor: Profesor) {
        return this.httpService.put(
            new Modelos.Post('/profesor/editar/' + profesor.id, this.profesorToBack(profesor),
                'El profesor fue editado con exito',
                'Hubo un error al editar el profesor. Intente nuevamente.')
        ).then(() => {
            this.datos = this.datos.map(_profesor => (_profesor.id === profesor.id) ? profesor : _profesor);
            this.updateObservers()
        });
    }

    public borrar(profesor: Profesor) {
        return this.httpService.post(
            new Modelos.Post('/profesor/borrar/', { id: profesor.id },
                'El profesor fue eliminado con exito',
                'Hubo un error al eliminar el profesor. Intente nuevamente.')
        ).then(() => { this.datos = this.datos.filter(srv => srv.id !== profesor.id); this.updateObservers() });
    }

    public traerTodos(): Promise<Array<Profesor>> {
        return this.httpService.mapper(
            this.httpService.get(
                new Modelos.Get('/profesor/all',
                    'Hubo un error al traer los profesores. Intente nuevamente.')
            ),
            (profesores) => profesores.map(profesor => this.profesorToFront(profesor))
        );
    }

    public traerUno(profesor: Profesor): Promise<Profesor> {
        return this.httpService.mapper(
            this.httpService.get(
                new Modelos.Get('/profesor/find/' + profesor.id,
                    'Hubo un error al traer el profesor. Intente nuevamente.')
            ),
            (_profesor) => this.profesorToFront(_profesor)
        );
    }
}
