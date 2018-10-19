import * as Modelos from './httpModels';
import {HttpService} from './httpService';
import {Injectable} from '@angular/core';
import {Socio} from '../models/socio';
import {Servicio} from '../models/servicio';
import {Observable, Subject} from 'rxjs';
import {HttpServiceSocios} from './httpServiceSocios';

@Injectable()
export class HttpServiceEntrada {

    accesoSocio = new Subject<{ socio: Socio, servicios: Servicio[] }>();
    cantEntradasPendientes = 0;
    constructor(private httpService: HttpService) {
    }

    public getCantEntradasPendientes() {
        return this.cantEntradasPendientes;
    }

    private updateObserver(servicios) {
        this.accesoSocio.next(servicios);
    }

    public onEntrada(): Observable<any> {
        return this.accesoSocio.asObservable();
    }

    public acceder(automatico: boolean, idSocio) {
        this.httpService.post(new Modelos.Post('/socio/acceder', {automatico: automatico, idSocio: idSocio}))
            .then((response: any) => {
                if (response === 'no puede entrar') {
                    this.httpService.sendMessage('El socio tiene la cuota impaga para el servicio. Dirijase a la compra para realizar la renovacion', 'error');
                } else if (response === 'registrada') {
                    this.httpService.sendMessage('Se ha registrado la entrada', 'success');
                } else {
                    this.httpService.sendMessage('Hay servicios en conflicto para la hora actual. Se debera resolver manualmente', 'warning');
                    const socio = new Socio(
                        response.nombre,
                        response.apellido,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        response.id
                    );
                    const servicios = response.servicios.map(srv => new Servicio(srv.nombre, null, srv.id));
                    this.cantEntradasPendientes ++;
                    console.log(this.cantEntradasPendientes);
                    this.updateObserver({socio: socio, servicios: servicios});
                }
            });
    }

    public registrarEntrada(socios: Socio[], servicio: Servicio) {
        this.cantEntradasPendientes --;
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
