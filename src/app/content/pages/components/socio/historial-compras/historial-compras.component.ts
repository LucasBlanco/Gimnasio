import {Component, OnInit} from '@angular/core';
import {HttpServiceSocios} from '../../../../services/httpServiceSocios';
import {SociosService} from '../serviceSocio';

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
                ({socio, descuento, membresia, ...resto}) => ({socio: socio.nombre, descuento: descuento && descuento.nombre, membresia: membresia.nombre, ...resto}));
        });
    }

}
