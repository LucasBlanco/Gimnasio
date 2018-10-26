import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Membresia} from "../../../models/membresia";
import {HttpServiceMembresia} from "../../../services/httpServiceMembresia";
import {HttpServiceServicio} from "../../../services/httpServiceServicio";

@Component({
  selector: 'm-membresia',
	template: `
		<div *ngIf="mostrarAlta">
			<m-am-membresia (alta)="realizarAlta($event)" (modificar)="realizarModificacion($event)"
							(mostrarTabla)="this.mostrarAlta = false" [membresiaAModificar]="membresiaSeleccionada"
							[editando]="editando"></m-am-membresia>
		</div>
		<div *ngIf="!mostrarAlta">
			<m-tabla-membresia (modificar)="cargarDatosModificacion($event)" (baja)="realizarBaja($event)" [membresias]="membresias"></m-tabla-membresia>
		</div>
	`,
})
export class AbmMembresiaComponent implements OnInit, AfterViewInit {
	membresias: Array<Membresia> = [];
	membresiaSeleccionada: Membresia;
	mostrarAlta: boolean = true;
	editando: boolean = false;

  constructor(private activatedRouter: ActivatedRoute, private membresiaSrv: HttpServiceMembresia) { }

  ngOnInit() {
	  this.activatedRouter.params.subscribe((params: Params) =>{
		  this.mostrarAlta = (params['view'] === 'am')
		  this.editando = false
		  this.membresiaSeleccionada = new Membresia(undefined, undefined, undefined, undefined, undefined, undefined, null)
	  })
  }

	ngAfterViewInit(){
		this.membresiaSrv.traerTodos().then( membresias => this.membresias = membresias)
	}

	realizarAlta(membresia: Membresia){
		this.membresiaSrv.crear(membresia).then( () =>{
			this.membresias.push(membresia)
		})
	}

	cargarDatosModificacion(membresia: Membresia){
		this.membresiaSrv.traerUno(membresia).then( _membresia => {
			this.membresiaSeleccionada = _membresia
			this.editando = true
			this.mostrarAlta = true
		})
	}

	realizarModificacion(membresia: Membresia){
		this.membresiaSrv.editar(membresia).then( () => {
			this.membresias = this.membresias.map( _membresia => (_membresia.id === membresia.id)? membresia: _membresia)
			this.mostrarAlta = false
		})
	}

	realizarBaja(membresia: Membresia){
  		this.membresiaSrv.borrar(membresia).then( () => this.membresias = this.membresias.filter( m => m.id !== membresia.id))
	}
}
