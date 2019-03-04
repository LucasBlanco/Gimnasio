import * as Modelos from "./httpModels";
import { HttpService } from "./httpService";
import { Descuento, DescuentoBuilder } from "../models/descuento";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class HttpServiceDescuento {
  subject = new BehaviorSubject<Descuento[]>([]);
  datos: Descuento[] = [];

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

  public crear = (descuento: Descuento) => {
    delete descuento.id;
    return this.httpService
      .post(
        new Modelos.Post(
          "/descuento/crear",
          DescuentoBuilder.toBackEnd(descuento),
          "El descuento fue creado con exito",
          "Hubo un error al crear el descuento. Intente nuevamente."
        )
      )
      .then((id: number) => {
        descuento.id = id;
        this.datos.push(descuento);
        this.updateObservers();
      });
  };

  public editar = (descuento: Descuento) => {
    return this.httpService
      .put(
        new Modelos.Post(
          "/descuento/editar/" + descuento.id,
          DescuentoBuilder.toBackEnd(descuento),
          "El descuento fue editado con exito",
          "Hubo un error al editar el descuento. Intente nuevamente."
        )
      )
      .then(() => {
        this.datos = this.datos.map(_descuento =>
          _descuento.id === descuento.id ? descuento : _descuento
        );
        this.updateObservers();
      });
  };

  public borrar = (descuento: Descuento) => {
    return this.httpService
      .post(
        new Modelos.Post(
          "/descuento/borrar/",
          { id: descuento.id },
          "El descuento fue eliminado con exito",
          "Hubo un error al eliminar el descuento. Intente nuevamente."
        )
      )
      .then(() => {
        this.datos = this.datos.filter(srv => srv.id !== descuento.id);
        this.updateObservers();
      });
  };

  public traerTodos = (): Promise<any> => {
    return this.httpService.mapper(
      this.httpService.get(
        new Modelos.Get(
          "/descuento/all",
          "Hubo un error al traer los descuentos. Intente nuevamente."
        )
      ),
      descuentos =>
        descuentos.map(descuento => DescuentoBuilder.fromBackEnd(descuento))
    );
  };

  public traerUno = (descuento: Descuento): Promise<any> => {
    return this.httpService.mapper(
      this.httpService.get(
        new Modelos.Get(
          "/descuento/find/" + descuento.id,
          "Hubo un error al traer el descuento. Intente nuevamente."
        )
      ),
      _descuento => DescuentoBuilder.fromBackEnd(_descuento)
    );
  };
}
