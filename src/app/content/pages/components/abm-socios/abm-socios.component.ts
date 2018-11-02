import {Component, OnInit, OnDestroy} from '@angular/core';
import {Socio} from '../../../models/socio';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpServiceSocios} from '../../../services/httpServiceSocios';
import { ABM } from '../abm/abm';

@Component({
  selector: 'm-abm-socios',
	template: `
		<div *ngIf="mostrarAlta">
				<m-am-socios (alta)="realizarAlta($event)"  (modificar)="realizarModificacion($event)" 
				(mostrarTabla)="this.mostrarAlta = false" [socioAModificar]="socioSeleccionado" [editando]="editando"></m-am-socios>
			</div>
			<div *ngIf="!mostrarAlta" >
				<m-tabla-socios (modificar)="cargarDatosModificacion($event)" [socios]="socios" ></m-tabla-socios>
			</div>
	`,
})
export class AbmSociosComponent implements OnInit, OnDestroy{

	socioSeleccionado: Socio = new Socio();
	socios: Array<Socio>;
	mostrarAlta: boolean = true;
	editando: boolean = false;
	subscription;

	constructor(private socioSrv: HttpServiceSocios, private activatedRouter: ActivatedRoute) {
	
  }

  ngOnInit() {
		this.activatedRouter.params.subscribe((params: Params) => {
			this.mostrarAlta = (params['view'] === 'am');
			this.editando = false
			this.socioSeleccionado = new Socio();
		});
	  this.subscription = this.socioSrv.getSociosSubscription().subscribe(socios => {
		  this.socios = socios;
		});
		
  }


	ngOnDestroy() {
		// unsubscribe to ensure no memory leaks
		this.subscription.unsubscribe();
	}

  realizarAlta(socio: Socio) {
	  this.socioSrv.crear(socio);
  }

	cargarDatosModificacion(socio: Socio) {
		this.socioSrv.traerUno(socio).then( _socio => {
			this.socioSeleccionado = _socio;
			this.editando = true;
			this.mostrarAlta = true;
		});
  }

  realizarModificacion(socio: Socio) {
  	this.socioSrv.editar(socio).then( () => {
		this.mostrarAlta = false;
  	});
  }

}
