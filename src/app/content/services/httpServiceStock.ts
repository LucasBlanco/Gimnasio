import * as Modelos from "./httpModels";
import { HttpService } from "./httpService";
import { Injectable } from "@angular/core";
import { CompraProducto } from "../models/compraProducto";
import { HttpServiceProducto } from "./httpServiceProducto";
import { Producto, ProductoBuilder } from "../models/producto";
import { TransaccionProducto } from "../models/transaccionProducto";
import { Usuario } from "../models/usuario";
@Injectable()
export class HttpServiceStock {
  constructor(
    private httpService: HttpService,
    private productoSrv: HttpServiceProducto
  ) {}
  public comprar = (compra: CompraProducto) => {
    return this.httpService
      .post(
        new Modelos.Post(
          "/producto/comprar",
          compra.mapToBackEnd(),
          "La compra fue creado con exito",
          "Hubo un error al realizar la compra. Intente nuevamente."
        )
      )
      .then(() => this.productoSrv.aumentarStock(compra));
  };

  public vender = (venta: CompraProducto) => {
    return this.httpService
      .post(
        new Modelos.Post(
          "/producto/vender",
          venta.mapToBackEnd(),
          "La venta fue creado con exito",
          "Hubo un error al realizar la venta. Intente nuevamente."
        )
      )
      .then(() => this.productoSrv.reducirStock(venta));
  };

  public traerHistorial(fechaInicio, fechaFin): Promise<TransaccionProducto[]> {
    return this.httpService
      .post(
        new Modelos.Post("/producto/registrosDeStock", {
          fechaInicio,
          fechaFin
        })
      )
      .then(historial => this.mappearHistorial(historial)) as any;
  }

  mappearTransaccion(producto, transaccion, usuario) {
    const { observacion, tipo_pago, fecha, tipo, precio } = transaccion;
    const prod = ProductoBuilder.fromBackEnd(producto);
    const prod2 = { ...prod, cantidad: producto.cantidad };
    const user = new Usuario(
      usuario.id,
      usuario.name,
      usuario.email,
      usuario.perfil
    );
    const trans = new TransaccionProducto(
      prod2,
      user,
      fecha,
      observacion,
      tipo_pago,
      tipo,
      precio
    );
    return trans;
  }

  mappearHistorial(historial) {
    return historial.map(({ producto, usuario, ...transaccion }) =>
      this.mappearTransaccion(producto, transaccion, usuario)
    );
  }
}
