import * as Modelos from './httpModels';
import { HttpService } from './httpService';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto, ProductoBuilder } from '../models/producto';
import { CompraProducto } from '../models/compraProducto';
@Injectable()
export class HttpServiceProducto {
  subject = new BehaviorSubject<Producto[]>([]);
  datos: Producto[] = [];

  constructor(private httpService: HttpService) {
    this.traerTodos().then(datos => {
      this.datos = datos;
      this.updateObservers();
    });
  }

  private updateObservers() {
    this.subject.next(this.datos);
  }

  public getSubscription = (): Observable<any> => {
    return this.subject.asObservable();
  };

  public crear = (producto: Producto) => {
    delete producto.id;
    return this.httpService
      .post(
        new Modelos.Post(
          '/producto/crear',
          ProductoBuilder.toBackEnd(producto),
          'El producto fue creado con exito',
          'Hubo un error al crear el producto. Intente nuevamente.'
        )
      )
      .then((id: number) => {
        producto.id = id;
        this.datos.push(producto);
        this.updateObservers();
      });
  };

  public editar = (producto: Producto) => {
    return this.httpService
      .put(
        new Modelos.Post(
          '/producto/editar/' + producto.id,
          ProductoBuilder.toBackEnd(producto),
          'El producto fue editado con exito',
          'Hubo un error al editar el producto. Intente nuevamente.'
        )
      )
      .then(() => {
        this.datos = this.datos.map(_producto =>
          _producto.id === producto.id ? producto : _producto
        );
        this.updateObservers();
      });
  };

  public borrar = (producto: Producto) => {
    return this.httpService
      .post(
        new Modelos.Post(
          '/producto/borrar/',
          { id: producto.id },
          'El producto fue eliminado con exito',
          'Hubo un error al eliminar el producto. Intente nuevamente.'
        )
      )
      .then(() => {
        this.datos = this.datos.filter(srv => srv.id !== producto.id);
        this.updateObservers();
      });
  };

  public traerTodos = (): Promise<Array<Producto>> => {
    return this.httpService.mapper(
      this.httpService.get(
        new Modelos.Get(
          '/producto/all',
          'Hubo un error al traer los productos. Intente nuevamente.'
        )
      ),
      productos =>
        productos.map(producto => ProductoBuilder.fromBackEnd(producto))
    );
  };

  public traerUno = (producto: Producto): Promise<Producto> => {
    return this.httpService.mapper(
      this.httpService.get(
        new Modelos.Get(
          '/producto/find/' + producto.id,
          'Hubo un error al traer el producto. Intente nuevamente.'
        )
      ),
      _producto => ProductoBuilder.fromBackEnd(_producto)
    );
  };

  public reducirStock = (transaccion: CompraProducto) => {
    transaccion.productos.forEach(producto => {
      const prod = this.datos.find(p => p.id === producto.id);
      prod.stock -= producto.cantidad;
    });
    this.updateObservers();
  };

  public aumentarStock = (transaccion: CompraProducto) => {
    transaccion.productos.forEach(producto => {
      const prod = this.datos.find(p => p.id === producto.id);
      prod.stock += producto.cantidad;
    });
    this.updateObservers();
  };
}
