import {Component, OnInit} from '@angular/core';
import {HttpServiceSocios} from '../../../../services/httpServiceSocios';
import {SociosService} from '../serviceSocio';
import moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'm-accesos',
    templateUrl: './accesos.component.html',
    styleUrls: ['./accesos.component.scss']
})
export class AccesosComponent implements OnInit {

    accesos;
    accesosTabla;

    constructor(private activatedRouter: ActivatedRoute, private httpSrvSocio: HttpServiceSocios, private srvSocio: SociosService) {
    }

    ngOnInit() {
        this.activatedRouter.params.subscribe((params) => {
            this.srvSocio.changeIdSocio(+params['id'])
            this.httpSrvSocio.subjectSocios.subscribe(socios => {
                const miSocio = socios.find(s => s.id === this.srvSocio.idSocio)
                this.httpSrvSocio.traerAccesos(miSocio).then(response => {
                    this.accesos = response;
                    console.log(this.accesos);
                    this.accesosTabla = this.accesos.map(
                        ({ fecha, servicio }) => ({ fecha: moment(fecha).format('DD/MM/YYYY HH:mm'), servicio: servicio.nombre }));
                });
            })
        });
        
    }

}
