import {Component} from '@angular/core';
import {Socio} from '../../../models/socio';
import {ActivatedRoute} from '@angular/router';
import {HttpServiceSocios} from '../../../services/httpServiceSocios';
import { ABM } from '../abm/abm';

@Component({
  selector: 'm-abm-socios',
	template: `
			<div *ngIf="mostrarAlta">
				<m-am-socios (alta)="realizarAlta($event)"  (modificar)="realizarModificacion($event)" (mostrarTabla)="this.mostrarAlta = false" [socioAModificar]="datoSeleccionado" [editando]="editando"></m-am-socios>
			</div>
			<div *ngIf="!mostrarAlta" >
				<m-tabla-socios (modificar)="cargarDatosModificacion($event)" [socios]="datos" ></m-tabla-socios>
			</div>
	`,
})
export class AbmSociosComponent extends ABM {

	datos: Array<Socio> = [];
	datoSeleccionado: Socio;

	constructor(public activatedRouter: ActivatedRoute, public sociosSrv: HttpServiceSocios) {
		super(activatedRouter, sociosSrv)
		this.alta = this.sociosSrv.crear.bind(this.sociosSrv)
		this.traerUno = this.sociosSrv.traerUno.bind(this.sociosSrv)
		this.editar = this.sociosSrv.editar.bind(this.sociosSrv)
		this.dataServiceSubscription = this.sociosSrv.getSociosSubscription()
	}

}
