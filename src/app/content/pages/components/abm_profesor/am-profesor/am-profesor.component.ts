import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, OnInit } from '@angular/core';
import { Profesor } from '../../../../models/profesor'
import { HttpServiceDescuento } from '../../../../services/httpServiceDescuento';
import { Descuento } from '../../../../models/descuento';

@Component({
	selector: 'm-am-profesores',
	templateUrl: './am-profesor.component.html'
})
export class AMProfesoresComponent implements OnChanges {

	profesor: Profesor
	@Input() profesorAModificar: Profesor = new Profesor()
	@Input() editando: boolean = false
	@Output('alta') altaEmitter = new EventEmitter<Profesor>()
	@Output('modificar') modificacionEmitter = new EventEmitter<Profesor>()
	@Output('mostrarTabla') irALaTablaEmitter = new EventEmitter<void>()
	tipoPago = 'fijo'
	constructor() { }

	ngOnChanges(changes: SimpleChanges) {
		this.profesor = (this.editando) ? this.profesorAModificar : new Profesor()
	}

	borrarProfesor() {
		this.profesor = new Profesor()
	}

	irALaTabla() {
		this.irALaTablaEmitter.emit()
	}

	enviarEvento() {
		if (!this.editando) {
			this.altaEmitter.emit(this.profesor)
		} else {
			this.modificacionEmitter.emit(this.profesor)
		}
		this.borrarProfesor()
	}
}
