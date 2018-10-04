import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Descuento} from "../../../../models/descuento";


@Component({
  selector: 'm-am-descuento',
  templateUrl: './am-descuento.component.html',
})
export class AmDescuentoComponent implements OnChanges {

	@Input() descuentoAModificar: Descuento = new Descuento();
	@Input() editando: boolean = false;
	@Output('alta') altaEmitter = new EventEmitter<Descuento>();
	@Output('modificar') modificacionEmitter = new EventEmitter<Descuento>();
	@Output('mostrarTabla') irALaTablaEmitter = new EventEmitter<void>();
	descuento: Descuento = new Descuento();

  constructor() { }

	ngOnChanges( changes: SimpleChanges) {
		this.descuento = (this.editando)? this.descuentoAModificar : new Descuento()
	}

	borrar() {
		this.descuento = new Descuento();
	}

	irALaTabla(){
		this.irALaTablaEmitter.emit()
	}

	enviarEvento() {
		if(!this.editando){
			this.altaEmitter.emit(this.descuento)
		}else{
			this.modificacionEmitter.emit(this.descuento)
		}
		this.borrar()
	}
}
