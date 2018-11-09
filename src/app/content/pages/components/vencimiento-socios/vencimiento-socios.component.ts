import { Component, OnInit } from '@angular/core';
import { Socio } from '../../../models/socio';
import { HttpServiceSocios } from '../../../services/httpServiceSocios';
import { HttpServiceEntrada } from '../../../services/httpServiceEntrada';
import { SociosService } from '../socio/serviceSocio';
import * as moment from 'moment'

@Component({
  selector: 'm-vencimiento-socios',
  template: `
		<div class="m-portlet m-portlet--success m-portlet--head-solid-bg">
			<div class="m-portlet__head">
				<div class="m-portlet__head-caption">
					<div class="m-portlet__head-title">
        			<span class="m-portlet__head-icon">
          				<i class="flaticon-edit"></i>
        			</span>
						<h3 class="m-portlet__head-text">
							Tabla de descuentos
						</h3>
					</div>
				</div>
			</div>
			
			<div class="m-portlet__body">
        <m-tabla [nombreColumnas]="['/*Apellido', 'Nombre', '/*Vencimiento']" [valorColumnas]="['apellido','nombre','fecha']" 
        [datos]="vencimientos" [estilos]="estilos" [acciones]="acciones"></m-tabla>
			</div>
		</div>`
})
export class VencimientoSociosComponent implements OnInit {

  vencimientos: {fecha: any, socio: Socio}
  estilos
  acciones

  constructor( private httpSociosSrv: HttpServiceSocios, private sociosSrv: SociosService) { }

  ngOnInit() {
    this.httpSociosSrv.traerVencimientos().then(venc => {this.vencimientos = venc.map(({fecha, socio}) => ({fecha, ...socio}))})
    this.acciones = [
      {
        callback: (socio) => this.sociosSrv.findUser(Number(socio.id)),
        class: 'la la-money',
        name: 'Cobrar'
      }
    ]
    this.estilos = { fecha: (fecha) => 
      (moment(fecha) >= moment()) ? 'm--font-success font-weight-bold'
        : (moment(fecha) >= moment().subtract(1, 'week')) ? 'm--font-warning font-weight-bold'
          : 'm--font-danger font-weight-bold' 
    }
  }

}
