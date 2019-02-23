import { Component, OnInit } from '@angular/core';
import { HttpServiceStock } from '../../../services/httpServiceStock';
import { TransaccionProducto } from '../../../models/transaccionProducto';

@Component({
  selector: 'm-historial-stock',
  templateUrl: './historial-stock.component.html'
})
export class HistorialStockComponent implements OnInit {
  historial: TransaccionProducto[];
  historialTabla = [];
  constructor(private stockService: HttpServiceStock) {}

  ngOnInit() {}

  filtrar(desde, hasta) {
    this.stockService
      .traerHistorial(desde, hasta)
      .then(
        historial =>
          (this.historialTabla = historial.map(h => ({
            cantidad: h.producto.cantidad,
            precio: h.precio,
            observacion: h.observacion,
            tipoPago: h.tipoPago,
            tipo: h.tipo,
            fecha: h.fecha,
            usuario: h.usuario.nombre,
            producto: h.producto.concepto
          })))
      );
  }
}
