import {Component, OnInit, ViewChild} from '@angular/core';
import {Socio} from "../../../models/socio";
import {AMSociosComponent} from "./am-socios/am-socios.component";
import {ActivatedRoute, Params} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'm-abm-socios',
	template: `		
			<div *ngIf="realizandoAlta">
				<m-am-socios (alta)="realizarAlta($event)"  (modificar)="realizarModificacion($event)" [socioAModificar]="socioSeleccionado"></m-am-socios>
			</div>
			<div *ngIf="editando" >
				<m-tabla-socios (modificar)="cargarDatosModificacion($event)"></m-tabla-socios>
			</div>
	`,
})
export class AbmSociosComponent implements OnInit {

	socioSeleccionado: Socio = new Socio()
	editando: Boolean = true
	realizandoAlta: Boolean = true
  constructor( private router: ActivatedRoute) {
  }

  ngOnInit() {
	  this.router.params.subscribe((params: Params) =>{
		  this.realizandoAlta = (params['view'] === 'am')
		  this.editando = (params['view'] === 'tabla')
		  this.socioSeleccionado = new Socio()
	  })
  }

  realizarAlta(socio: Socio){
  	console.log('Alta', socio)
  }

	cargarDatosModificacion(socio: Socio){
	  console.log('CArgar datos', socio)
  	this.socioSeleccionado = socio
	  this.realizandoAlta = true
		this.editando = false
  }

  realizarModificacion(socio: Socio){
  	console.log('Modificar socio:', socio)
  }

}
