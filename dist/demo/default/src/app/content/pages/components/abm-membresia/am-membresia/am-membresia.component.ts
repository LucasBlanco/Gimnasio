import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Membresia} from "../../../../models/membresia";
import {Servicio} from "../../../../models/servicio";
import {Descuento} from "../../../../models/descuento";

@Component({
  selector: 'm-am-membresia',
  templateUrl: './am-membresia.component.html',
})
export class AmMembresiaComponent implements OnChanges {

	@Input() membresiaAModificar: Membresia = new Membresia();
	@Input() editando: boolean = false;
	@Output('alta') altaEmitter = new EventEmitter<Membresia>();
	@Output('modificar') modificacionEmitter = new EventEmitter<Membresia>();
	@Output('mostrarTabla') irALaTablaEmitter = new EventEmitter<void>();
	membresia: Membresia = new Membresia();
	servicios: Array<Servicio>= [new Servicio('Salsa', '123', 1), new Servicio('Zumba', '123', 2)];
	descuentos: Array<Descuento> = [new Descuento('Familia', 30, 10, false, 1),
		new Descuento('Banco galicia', 30, 5, false, 2)];
	serviciosSeleccionados: Array<boolean> = [];
	membresiasSeleccionadas: Array<boolean> = [];
  constructor() { }

	ngOnChanges( changes: SimpleChanges) {
		this.membresia = (this.editando)? this.membresiaAModificar : new Membresia()
	}

	borrar() {
		this.membresia = new Membresia();
		this.serviciosSeleccionados = [];
		this.membresiasSeleccionadas = []
	}

	irALaTabla(){
		this.irALaTablaEmitter.emit()
	}

	enviarEvento() {

		if(!this.editando){
			this.altaEmitter.emit(this.membresia)
		}else{
			this.modificacionEmitter.emit(this.membresia)
		}
		this.borrar()
	}
}
