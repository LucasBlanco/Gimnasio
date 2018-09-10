import {Component, OnInit, AfterViewInit, ViewChild, Output, Input, EventEmitter} from '@angular/core';
import {Socio} from '../../../../models/socio';
import {TablaComponent} from '../../shared-components/tabla/tabla.component';
import {Router} from "@angular/router";
import {HttpServiceSocios} from "../../../../services/htppServiceSocios";
declare var $: any

@Component({
	selector: 'm-tabla-socios',
	template: `
		<div class="m-portlet m-portlet--success m-portlet--head-solid-bg">
			<div class="m-portlet__head">
				<div class="m-portlet__head-caption">
					<div class="m-portlet__head-title">
        			<span class="m-portlet__head-icon">
          				<i class="flaticon-edit"></i>
        			</span>
						<h3 class="m-portlet__head-text">
							Tabla de usuarios
						</h3>
					</div>
				</div>
			</div>
			<div class="m-portlet__body">
				<m-tabla [datos]="tabla.datos"></m-tabla>
			</div>
		</div>`
})
export class TablaSociosComponent implements AfterViewInit, OnInit {

	@Input() socios: Array<Socio> = []
	@Output('modificar') emitModificacion: EventEmitter<Socio> = new EventEmitter()
	@ViewChild(TablaComponent) tabla: TablaComponent

	constructor( private httpService: HttpServiceSocios) {

	}
	ngOnInit() {
		// this.socios = [new Socio('Carlos', 'Garcia', 'cgarcia@email.com', '2018-05-15', 123, 'mensual', 123,)]
		this.httpService.getSocios().then(socios => {
			(this.socios as any) = socios
		})
	}

	ngAfterViewInit() {
		this.tabla.datos = this.socios
		this.tabla.nombreColumnas = ['Nombre', 'Apellido']
		this.tabla.valorColumnas = ['nombre', 'apellido']
		this.tabla.acciones = [
			{
				callback: this.enviarModificacion.bind(this),
				clase: 'la la-edit',
				nombre: 'Modificar'
			}
		]
	}

	enviarModificacion(socio: Socio) {
		this.emitModificacion.emit(socio)
	}


}
