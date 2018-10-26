import {Component, OnInit} from '@angular/core';
import {HttpServiceSocios} from '../../../../services/httpServiceSocios';
import {SociosService} from '../serviceSocio';
import moment from 'moment';

@Component({
    selector: 'm-historial-compras',
    templateUrl: './historial-compras.component.html',
    styleUrls: ['./historial-compras.component.scss']
})
export class HistorialComprasComponent implements OnInit {

    historial;
    historialTabla;

    constructor(private httpSrvSocio: HttpServiceSocios, private srvSocio: SociosService) {
    }

    ngOnInit() {
        const miSocio = this.srvSocio.getSocio();
        this.httpSrvSocio.traerHistorial(miSocio).then(response => {
            this.historial = response;
            console.log(this.historial);
            this.historialTabla = this.historial.map(
                ({socio, descuento_socio, descuento_membresia, membresia, fecha, ...resto}) => {
                    return {socio: socio.nombre,
                        descuentoSocio: descuento_socio && descuento_socio.nombre,
                        descuentoMembresia: descuento_membresia && descuento_membresia.nombre,
                        membresia: membresia.nombre,
                        fecha: moment(fecha).format('DD/MM/YYYY  hh:mm'),
                        ...resto};
                });
        });
    }

}
