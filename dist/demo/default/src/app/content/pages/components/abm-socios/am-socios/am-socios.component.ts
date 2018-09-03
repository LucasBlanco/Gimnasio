import {Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Socio} from 'models/socio'
import {AbmSociosComponent} from "../abm-socios.component";
import {Router} from "@angular/router";

@Component({
	selector: 'm-am-socios',
	templateUrl: './am-socios.component.html'
})
export class AMSociosComponent implements OnChanges {

	editando: Boolean = false
	socioCreado: Boolean = false
	socio: Socio
	@Input() socioAModificar: Socio = new Socio()
	@Output('alta') altaEmitter = new EventEmitter<Socio>()
	@Output('modificar') modificacionEmitter = new EventEmitter<Socio>()

	constructor( private router: Router) {
	}
	ngOnChanges( changes: SimpleChanges) {
		this.socio = (changes.socioAModificar.currentValue.dni !== null)? this.socioAModificar : new Socio()
		this.editando = (changes.socioAModificar.currentValue.dni !== null)
		this.socioCreado = false
	}

	irAVenderClase(){
		this.router.navigate(['/pagos', this.socio.dni]);
	}

	borrarSocio() {
		this.socio = new Socio()
	}

	enviarEvento() {
		if(this.socioAModificar){
			this.altaEmitter.emit(this.socio)
			this.socioCreado = true
		}else{
			this.modificacionEmitter.emit(this.socio)
			this.borrarSocio()
		}

	}
}
