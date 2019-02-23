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
				<m-tabla-profesores (modificar)="cargarDatosModificacion($event)" (baja)="realizarBaja($event)"  [datos]="datos" ></m-tabla-profesores>
			</div>
	`,
})
export class AbmProfesoresComponent extends ABM {

	datos: Array<Profesor> = [];
	datoSeleccionado: Profesor;

	constructor(public activatedRouter: ActivatedRoute, public profesorSrv: HttpServiceProfesor) {
		super(activatedRouter, profesorSrv)
	}


}
