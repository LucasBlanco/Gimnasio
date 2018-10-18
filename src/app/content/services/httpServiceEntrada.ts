
import * as Modelos from './httpModels';
import {HttpService} from './httpService';
import {Injectable} from '@angular/core';
import {Socio} from '../models/socio';
import {Servicio} from '../models/servicio';
import {Observable} from 'rxjs';
@Injectable()
export class HttpServiceEntrada {

    accesoSocio: Observable<Servicio[]> = new Observable();

    constructor(private httpService: HttpService) {
    }

    private updateObserver(servicios: Servicio[]) {
        this.accesoSocio = new Observable(
            observer => {
                    observer.next(servicios);
            });
    }

    public acceder( automatico: boolean, socio) {
         this.httpService.post(new Modelos.Post('/socio/acceder', {automatico: automatico, idSocio: socio})).then( response => {
                if (response === 'no puede entrar') {
                    this.httpService.sendMessage('El socio tiene la cuota impaga para el servicio. Dirijase a la compra para realizar la renovacion', 'error');
                } else if (response === 'registrada') {
                    this.httpService.sendMessage('Se ha registrado la entrada de ${socio.apellido}, ${socio.nombre}', 'success');
                } else {
                    this.httpService.sendMessage('Hay servicios en conflicto para la hora actual. Se debera resolver manualmente', 'warning');
                    this.updateObserver(response as Servicio[]);
                }
            });
    }

    public registrarEntrada( socios: Socio[], servicio: Servicio ) {
        const idSocios = socios.map(socio => socio.id);
        return this.httpService.post(
            new Modelos.Post('/servicio/registrarEntradas', {socios: idSocios, idServicio: servicio.id},
                'Servicio: ${servicio.nombre} \n Socio: ${socio.apellido}, ${socio.nombre}',
                'Hubo un error al registrar el ingreso. Intente nuevamente.')
        );
    }


    public devolverEntradas(socios: Socio[], servicio: Servicio) {
        const idSocios = socios.map(socio => socio.id);
        return this.httpService.post(
            new Modelos.Post('/servicio/devolverEntradas', {idServicio: servicio.id, socios: idSocios},
                'Se ha devuelto la entrada a los socios con exito.',
                'Hubo un error al devolver la entrada. Intente nuevamente.')
        );
    }

}
