import { Component, OnInit, OnDestroy } from '@angular/core';
import { Profesor } from '../../../models/profesor';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpServiceProfesor } from '../../../services/httpServiceProfesor';
import { ABM } from '../abm/abm';

@Component({
	selector: 'm-abm-profesores',
	template: `
		<div *ngIf="mostrarAlta">
				<m-am-profesores (alta)="realizarAlta($event)"  (modificar)="realizarModificacion($event)" 
				(mostrarTabla)="this.mostrarAlta = false" [profesorAModificar]="datoSeleccionado" [editando]="editando"></m-am-profesores>
			</div>
			<div *ngIf="!mostrarAlta" >
				<m-tabla-profesores (modificar)="cargarDatosModificacion($event)" [datos]="datos" ></m-tabla-profesores>
			</div>
	`,
})
export class AbmProfesoresComponent extends ABM {

	datos: Array<Profesor> = [];
	datoSeleccionado: Profesor;

	constructor(public activatedRouter: ActivatedRoute, public profesorSrv: HttpServiceProfesor) {
		super(activatedRouter, profesorSrv)
		this.alta = this.profesorSrv.crear.bind(this.profesorSrv)
		this.traerUno = this.profesorSrv.traerUno.bind(this.profesorSrv)
		this.editar = this.profesorSrv.editar.bind(this.profesorSrv)
		this.dataServiceSubscription = this.profesorSrv.getSubscription()
	}


}
