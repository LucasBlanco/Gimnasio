import {Component, OnInit} from '@angular/core';
import {HttpServiceSocios} from '../../../../services/httpServiceSocios';
import {SociosService} from '../serviceSocio';
import moment from 'moment';

@Component({
    selector: 'm-accesos',
    templateUrl: './accesos.component.html',
    styleUrls: ['./accesos.component.scss']
})
export class AccesosComponent implements OnInit {

    accesos;
    accesosTabla;

    constructor(private httpSrvSocio: HttpServiceSocios, private srvSocio: SociosService) {
    }

    ngOnInit() {
        const miSocio = this.srvSocio.getSocio();
        this.httpSrvSocio.traerAccesos(miSocio).then(response => {
            this.accesos = response;
            console.log(this.accesos);
            this.accesosTabla = this.accesos.map(
                ({ fecha, servicio }) => ({ fecha: moment(fecha).format('DD/MM/YYYY  hh:mm'), servicio: servicio.nombre}));
        });
    }

}
