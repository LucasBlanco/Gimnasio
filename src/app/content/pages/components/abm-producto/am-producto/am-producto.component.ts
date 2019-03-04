import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { Producto, ProductoBuilder } from '../../../../models/producto';
@Component({
  selector: 'm-am-producto',
  templateUrl: './am-producto.component.html'
})
export class AmProductoComponent implements OnChanges {

  @Input() productoAModificar: Producto = ProductoBuilder.empty();
  @Input() editando: boolean = false;
  @Output('alta') altaEmitter = new EventEmitter<Producto>();
  @Output('modificar') modificacionEmitter = new EventEmitter<Producto>();
  @Output('mostrarTabla') irALaTablaEmitter = new EventEmitter<void>();
  producto: Producto = ProductoBuilder.empty();
  itemsSeleccionados = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.producto = this.editando ? this.productoAModificar : ProductoBuilder.empty();
  }

  borrar() {
    this.producto = ProductoBuilder.empty();
  }

  irALaTabla() {
    this.irALaTablaEmitter.emit();
  }

  enviarEvento() {
    if (!this.editando) {
      this.altaEmitter.emit(this.producto);
    } else {
      this.modificacionEmitter.emit(this.producto);
    }
    this.borrar();
  }

  updateItemsSeleccionados(items) {
    this.itemsSeleccionados = items;
    console.log(this.itemsSeleccionados);
  }

  getProductImg() {
	return './assets/app/media/img/blog/protein.png'
  }
}
