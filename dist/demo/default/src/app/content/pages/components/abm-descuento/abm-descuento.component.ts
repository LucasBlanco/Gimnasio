import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Descuento} from "../../../models/descuento";
import {HttpServiceDescuento} from "../../../services/httpServiceDescuento";

@Component({
  selector: 'm-descuento',
	template: `		
		<div *ngIf="mostrarAlta">
			<m-am-descuento (alta)="realizarAlta($event)"  (modificar)="realizarModificacion($event)"
							(mostrarTabla)="this.mostrarAlta = false" [descuentoAModificar]="descuentoSeleccionado"
							[editando]="editando"></m-am-descuento>
		</div>
		<div *ngIf="!mostrarAlta">
			<m-tabla-descuento (modificar)="cargarDatosModificacion($event)" (baja)="realizarBaja($event)" [descuentos]="descuentos"></m-tabla-descuento>
		</div>
	`,
})
export class AbmDescuentoComponent implements OnInit, AfterViewInit {
	descuentos: Array<Descuento> = [];
	descuentoSeleccionado: Descuento;
	mostrarAlta: boolean = true;
	editando: boolean = false;

  constructor(private activatedRouter: ActivatedRoute, private descuentoSrv: HttpServiceDescuento) { }

  ngOnInit() {
	  this.activatedRouter.params.subscribe((params: Params) =>{
		  this.mostrarAlta = (params['view'] === 'am')
		  this.descuentoSeleccionado = new Descuento()
	  })
  }

	ngAfterViewInit(){
		this.descuentoSrv.traerTodos().then( descuentos =>
			this.descuentos = descuentos)
	}

	realizarAlta(descuento: Descuento){
		this.descuentoSrv.crear(descuento).then( () =>{
			this.descuentos.push(descuento)
		})
	}

	cargarDatosModificacion(descuento: Descuento){
		this.descuentoSrv.traerUno(descuento).then( _descuento => {
			this.descuentoSeleccionado = _descuento
			this.editando = true
			this.mostrarAlta = true
		})
	}

	realizarModificacion(descuento: Descuento){
  		this.descuentoSrv.editar(descuento).then( () => {
			this.descuentos = this.descuentos.map( _descuento => (_descuento.id === descuento.id)? descuento: _descuento)
		})
	}

	realizarBaja(descuento: Descuento) {
		this.descuentoSrv.borrar(descuento).then(  () => this.descuentos = this.descuentos.filter( srv => srv.id !== descuento.id))
	}
}
