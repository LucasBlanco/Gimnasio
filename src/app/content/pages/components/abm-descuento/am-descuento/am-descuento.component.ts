import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { Descuento, DescuentoBuilder } from '../../../../models/descuento';


@Component({
  selector: 'm-am-descuento',
  templateUrl: './am-descuento.component.html',
})
export class AmDescuentoComponent implements OnChanges {

	@Input() descuentoAModificar: Descuento = new DescuentoBuilder().empty();
	@Input() editando: boolean = false;
	@Output('alta') altaEmitter = new EventEmitter<Descuento>();
	@Output('modificar') modificacionEmitter = new EventEmitter<Descuento>();
	@Output('mostrarTabla') irALaTablaEmitter = new EventEmitter<void>();
	descuento: Descuento = new DescuentoBuilder().empty();

  constructor() { }

	ngOnChanges( changes: SimpleChanges) {
		this.descuento = (this.editando) ? this.descuentoAModificar : new DescuentoBuilder().empty()
	}

	borrar() {
		this.descuento = new DescuentoBuilder().empty();
	}

	irALaTabla() {
		this.irALaTablaEmitter.emit()
	}

	enviarEvento() {
		this.descuento.vencimiento = (this.descuento.tipo === 'membresia') ? 0 : this.descuento.vencimiento
		if (!this.editando) {
			this.altaEmitter.emit(this.descuento)
		} else {
			this.modificacionEmitter.emit(this.descuento)
		}
		this.borrar()
	}
}
