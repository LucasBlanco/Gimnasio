import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Socio} from 'models/socio'
import {HttpServiceDescuento} from "../../../../services/httpServiceDescuento";
import {Descuento} from "../../../../models/descuento";

@Component({
	selector: 'm-am-socios',
	templateUrl: './am-socios.component.html'
})
export class AMSociosComponent implements OnChanges {
	socio: Socio
	@Input() socioAModificar: Socio = new Socio()
	@Input() editando: boolean = false
	@Output('alta') altaEmitter = new EventEmitter<Socio>()
	@Output('modificar') modificacionEmitter = new EventEmitter<Socio>()
	@Output('mostrarTabla') irALaTablaEmitter = new EventEmitter<void>()
	descuentos: Descuento[]

	constructor( private descuentoSrv: HttpServiceDescuento){}

	ngOnInit(){
		 this.descuentoSrv.traerTodos().then( descuentos => this.descuentos = descuentos)
	}
	ngOnChanges( changes: SimpleChanges) {
		this.socio = (this.editando)? this.socioAModificar : new Socio()
	}

	borrarSocio() {
		this.socio = new Socio()
	}

	irALaTabla(){
		this.irALaTablaEmitter.emit()
	}

	enviarEvento() {
		if(!this.editando){
			this.altaEmitter.emit(this.socio)
		}else{
			this.modificacionEmitter.emit(this.socio)
		}
		this.borrarSocio()
	}
}
