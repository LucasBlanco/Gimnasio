import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Servicio} from '../../../models/servicio';
import {HttpServiceServicio} from '../../../services/httpServiceServicio';

@Component({
  selector: 'm-membresia',
	template: `
		<div *ngIf="mostrarAlta">
			<m-am-servicio (alta)="realizarAlta($event)"  (modificar)="realizarModificacion($event)"
							(mostrarTabla)="this.mostrarAlta = false" [servicioAModificar]="servicioSeleccionado"
							[editando]="editando"></m-am-servicio>
		</div>
		<div *ngIf="!mostrarAlta">
			<m-tabla-servicio (modificar)="cargarDatosModificacion($event)" (baja)="realizarBaja($event)" [servicios]="servicios"></m-tabla-servicio>
		</div>
	`,
})
export class AbmServicioComponent implements OnInit, AfterViewInit {
	servicios: Array<Servicio> = [];
	servicioSeleccionado: Servicio;
	mostrarAlta: boolean = true;
	editando: boolean = false;

  constructor(private activatedRouter: ActivatedRoute, private servicioSrv: HttpServiceServicio) { }

  ngOnInit() {
	  this.activatedRouter.params.subscribe((params: Params) => {
		  this.mostrarAlta = (params['view'] === 'am');
		  this.editando = false
		  this.servicioSeleccionado = new Servicio();
	  });
  }

	ngAfterViewInit() {
		this.servicioSrv.traerTodos().then( servicios => this.servicios = servicios);
	}

	realizarAlta(servicio: Servicio) {
		this.servicioSrv.crear(servicio).then( () => {
			this.servicios.push(servicio);
		});
	}

	cargarDatosModificacion(servicio: Servicio) {
		this.servicioSrv.traerUno(servicio).then( _servicio => {
			this.servicioSeleccionado = _servicio;
			this.editando = true;
			this.mostrarAlta = true;
		});
	}

	realizarModificacion(servicio: Servicio) {
  		this.servicioSrv.editar(servicio).then( () => {
			this.servicios = this.servicios.map( _servicio => (_servicio.id === servicio.id) ? servicio : _servicio);
			this.mostrarAlta = false;
		});
	}

	realizarBaja(servicio: Servicio) {
		this.servicioSrv.borrar(servicio).then(  () => this.servicios = this.servicios.filter( srv => srv.id !== servicio.id));
	}
}
