import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Socio} from "../../../models/socio";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpServiceSocios} from "../../../services/htppServiceSocios";

@Component({
  selector: 'm-abm-socios',
	template: `		
			<div *ngIf="realizandoAlta">
				<m-am-socios (alta)="realizarAlta($event)"  (modificar)="realizarModificacion($event)" [socioAModificar]="socioSeleccionado"></m-am-socios>
			</div>
			<div *ngIf="editando" >
				<m-tabla-socios (modificar)="cargarDatosModificacion($event)" [socios]="socios" ></m-tabla-socios>
			</div>
	`,
})
export class AbmSociosComponent implements OnInit, AfterViewInit {

	socioSeleccionado: Socio = new Socio()
	socios: Array<Socio> = []
	editando: Boolean = true
	realizandoAlta: Boolean = true

  constructor( private activatedRouter: ActivatedRoute, private socioSrv: HttpServiceSocios, private router: Router) {
  }

  ngOnInit() {
	  this.activatedRouter.params.subscribe((params: Params) =>{
		  this.realizandoAlta = (params['view'] === 'am')
		  this.editando = (params['view'] === 'tabla')
		  this.socioSeleccionado = new Socio()
	  })
  }

  ngAfterViewInit(){
	  this.socioSrv.traerTodos().then( socios =>
		  this.socios = socios)
  }

  realizarAlta(socio: Socio){
	  this.socioSrv.crear(socio).then( () =>{
		 // this.router.navigate(['/pagos', socio.dni]);
	  })
  }

	cargarDatosModificacion(socio: Socio){
		this.socioSrv.traerUno(socio).then( _socio => {
			this.socioSeleccionado = _socio
			this.realizandoAlta = true
			this.editando = false
		})
  }

  realizarModificacion(socio: Socio){
  	this.socioSrv.editar(socio).then( () =>
		this.socios = this.socios.map( _socio => (_socio.id === socio.id)? socio: _socio)
	)
  }

}
