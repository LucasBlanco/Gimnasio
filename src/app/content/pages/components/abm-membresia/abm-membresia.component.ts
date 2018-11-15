import {  Component} from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { Membresia } from "../../../models/membresia";
import { HttpServiceMembresia } from "../../../services/httpServiceMembresia";
import { ABM } from '../abm/abm';

@Component({
	selector: 'm-membresia',
	template: `
		<div *ngIf="mostrarAlta">
			<m-am-membresia (alta)="realizarAlta($event)" (modificar)="realizarModificacion($event)"
							(mostrarTabla)="this.mostrarAlta = false" [membresiaAModificar]="datoSeleccionado"
							[editando]="editando"></m-am-membresia>
		</div>
		<div *ngIf="!mostrarAlta">
			<m-tabla-membresia (modificar)="cargarDatosModificacion($event)" (baja)="realizarBaja($event)" [datos]="datos"></m-tabla-membresia>
		</div>
	`,
})
export class AbmMembresiaComponent extends ABM {
	datos: Array<Membresia> = [];
	datoSeleccionado: Membresia;

	constructor(public activatedRouter: ActivatedRoute, public membresiaSrv: HttpServiceMembresia) { 
		super(activatedRouter, membresiaSrv)
		this.alta = this.membresiaSrv.crear.bind(this.membresiaSrv)
		this.traerUno = this.membresiaSrv.traerUno.bind(this.membresiaSrv)
		this.editar = this.membresiaSrv.editar.bind(this.membresiaSrv)
		this.borrar = this.membresiaSrv.borrar.bind(this.membresiaSrv)
		this.dataService = this.membresiaSrv
	}

}


/*realizarAlta(membresia: Membresia) {
		this.membresiaSrv.crear(membresia).then(() => {
			this.membresias.push(membresia)
		})
	}

	cargarDatosModificacion(membresia: Membresia) {
		this.membresiaSrv.traerUno(membresia).then(_membresia => {
			this.membresiaSeleccionada = _membresia
			this.editando = true
			this.mostrarAlta = true
		})
	}

	realizarModificacion(membresia: Membresia) {
		this.membresiaSrv.editar(membresia).then(() => {
			this.membresias = this.membresias.map(_membresia => (_membresia.id === membresia.id) ? membresia : _membresia)
			this.mostrarAlta = false
		})
	}

	realizarBaja(membresia: Membresia) {
		this.membresiaSrv.borrar(membresia).then(() => this.membresias = this.membresias.filter(m => m.id !== membresia.id))
	}*/
