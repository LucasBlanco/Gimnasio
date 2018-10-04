import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Socio} from "../../../models/socio";
import {ActivatedRoute, Params} from "@angular/router";
import {HttpServiceSocios} from "../../../services/httpServiceSocios";

@Component({
  selector: 'm-abm-socios',
	template: `		
		<div *ngIf="mostrarAlta">
				<m-am-socios (alta)="realizarAlta($event)"  (modificar)="realizarModificacion($event)" (mostrarTabla)="this.mostrarAlta = false" [socioAModificar]="socioSeleccionado" [editando]="editando"></m-am-socios>
			</div>
			<div *ngIf="!mostrarAlta" >
				<m-tabla-socios (modificar)="cargarDatosModificacion($event)" [socios]="socios" ></m-tabla-socios>
			</div>
	`,
})
export class AbmSociosComponent implements OnInit, AfterViewInit {

	socioSeleccionado: Socio = new Socio();
	socios: Array<Socio>;
	mostrarAlta: boolean = true;
	editando: boolean = false;

  constructor( private activatedRouter: ActivatedRoute, private socioSrv: HttpServiceSocios) {
  }

  ngOnInit() {
	  this.activatedRouter.params.subscribe((params: Params) =>{
		  this.mostrarAlta = (params['view'] === 'am');
		  this.socioSeleccionado = new Socio()
	  })
  }

  ngAfterViewInit(){
	  this.socioSrv.traerTodos().then( socios => this.socios = socios)
  }

  realizarAlta(socio: Socio){
	  this.socioSrv.crear(socio).then( () =>{
	  	// this.router.navigate(['/pagos', socio.dni]);
	  })
  }

	cargarDatosModificacion(socio: Socio){
		this.socioSrv.traerUno(socio).then( _socio => {
			this.socioSeleccionado = _socio;
			this.editando = true;
			this.mostrarAlta = true
		})
  }

  realizarModificacion(socio: Socio){
  	this.socioSrv.editar(socio).then( () =>{
		this.socios = this.socios.map( _socio => (_socio.id === socio.id)? socio: _socio);
		this.mostrarAlta = false
  	})
  }

}
