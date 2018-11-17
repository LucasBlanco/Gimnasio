import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Descuento } from '../../../models/descuento';
import { HttpServiceDescuento } from '../../../services/httpServiceDescuento';
import { ABM } from '../abm/abm';

@Component({
	selector: 'm-descuento',
	template: `
		<div *ngIf="mostrarAlta">
			<m-am-descuento (alta)="realizarAlta($event)"  (modificar)="realizarModificacion($event)"
							(mostrarTabla)="this.mostrarAlta = false" [descuentoAModificar]="datoSeleccionado"
							[editando]="editando"></m-am-descuento>
		</div>
		<div *ngIf="!mostrarAlta">
			<m-tabla-descuento (modificar)="cargarDatosModificacion($event)" (baja)="realizarBaja($event)" [datos]="datos"></m-tabla-descuento>
		</div>
	`,
})
export class AbmDescuentoComponent extends ABM implements OnInit {
	datos: Array<Descuento> = [];
	datoSeleccionado: Descuento;

	constructor(public activatedRouter: ActivatedRoute, public descuentoSrv: HttpServiceDescuento) {
		super(activatedRouter, descuentoSrv)
		this.alta = this.descuentoSrv.crear.bind(this.descuentoSrv)
		this.traerUno = this.descuentoSrv.traerUno.bind(this.descuentoSrv)
		this.editar = this.descuentoSrv.editar.bind(this.descuentoSrv)
		this.borrar = this.descuentoSrv.borrar.bind(this.descuentoSrv)
		this.dataServiceSubscription = this.descuentoSrv.getSubscription()
	}

}
