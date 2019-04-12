import { Component, OnInit } from "@angular/core";
import { Producto } from "../../../models/producto";
import { ActivatedRoute } from "@angular/router";
import { HttpServiceProducto } from "../../../services/httpServiceProducto";
import { HttpServiceStock } from "../../../services/httpServiceStock";
import { CompraProducto } from "../../../models/compraProducto";
import { pesosPipe } from "../shared-components/tabla/pipesTabla";

@Component({
  selector: "m-gestion-stock",
  templateUrl: "./gestion-stock.component.html"
})
export class GestionStockComponent implements OnInit {
  productos: Array<Producto> = [];
  transaccion: CompraProducto = new CompraProducto();
  pesosPipe;

  constructor(
    public activatedRouter: ActivatedRoute,
    public productosSrv: HttpServiceProducto,
    public stockSrv: HttpServiceStock
  ) {
    this.pesosPipe = pesosPipe;
  }

  ngOnInit() {
    this.productosSrv.getSubscription().subscribe(datos => {
      this.productos = datos.map(d => ({ ...d, cantidad: 1 }));
    });
  }

  agregarItemATransaccion(
    producto: Producto & { cantidad: number } & { checked: boolean }
  ) {
    if (producto.checked) {
      this.transaccion.productos = [...this.transaccion.productos, producto];
    } else {
      this.transaccion.productos = this.transaccion.productos.filter(
        p => p !== producto
      );
    }
  }

  comprar() {
    this.stockSrv
      .comprar(this.transaccion)
      .then(() => (this.transaccion = new CompraProducto()));
  }

  vender() {
    this.stockSrv
      .vender(this.transaccion)
      .then(() => (this.transaccion = new CompraProducto()));
  }

  totalCompra() {
    return this.transaccion.productos.reduce(
      (total, r) => total + r.precioCompra * r.cantidad,
      0
    );
  }

  totalVenta() {
    return this.transaccion.productos.reduce(
      (total, r) => total + r.precioVenta * r.cantidad,
      0
    );
  }

  productoNoTieneStock() {
    return this.transaccion.productos.some(
      p => p.stock <= 0 || p.stock === null
    );
  }
  cantidadAVenderMayorAStock() {
    return this.transaccion.productos.some(p => p.stock < p.cantidad);
  }
}
