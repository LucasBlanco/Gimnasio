import {Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Socio} from 'models/socio'

@Component({
	selector: 'm-am-socios',
	templateUrl: './am-socios.component.html'
})
export class AMSociosComponent implements OnChanges {

	editando: Boolean = false
	socio: Socio
	@Input() socioAModificar: Socio = new Socio()
	@Output('alta') altaEmitter = new EventEmitter<Socio>()
	@Output('modificar') modificacionEmitter = new EventEmitter<Socio>()
	descuentos = [{nombre: '30%', id: 1}, {nombre: '40%', id: 2}, {nombre: '60%', id: 3}]


	ngOnChanges( changes: SimpleChanges) {
		this.editando = (changes.socioAModificar.currentValue.dni !== null)
		this.socio = (this.editando)? this.socioAModificar : new Socio()
	}


	borrarSocio() {
		this.socio = new Socio()
	}

	enviarEvento() {
		if(this.socioAModificar){
			this.altaEmitter.emit(this.socio)
		}else{
			this.modificacionEmitter.emit(this.socio)
		}
		this.borrarSocio()
	}
}
