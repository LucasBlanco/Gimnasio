import { Injectable } from "@angular/core";
import * as Modelos from "./httpModels";
import { HttpService } from "./httpService";
import moment from "moment";
import { Observable, BehaviorSubject } from "rxjs";
import { Clase, ClaseBuilder } from "../models/clase";
@Injectable()
export class HttpServiceClase {
  builder = new ClaseBuilder();
  subject = new BehaviorSubject<Clase[]>([]);
  datos: Clase[] = [];

  constructor(private httpService: HttpService) {}

  private updateObservers() {
    this.subject.next(this.datos);
  }


  public crear = (clase: Clase) => {
    delete clase.id;
    return this.httpService
      .post(
        new Modelos.Post(
          "/clase/crear",
          this.builder.toBackEnd(clase),
          "El clase fue creado con exito",
          "Hubo un error al crear la clase. Intente nuevamente."
        )
      )
      .then((id: number) => {
        clase.id = id;
        this.datos.push(clase);
        this.updateObservers();
      });
  };

  public editar = (clase: Clase) => {
    return this.httpService
      .put(
        new Modelos.Post(
          "/clase/editar/" + clase.id,
          this.builder.toBackEnd(clase),
          "El clase fue editado con exito",
          "Hubo un error al editar la clase. Intente nuevamente."
        )
      )
      .then(() => {
        this.datos = this.datos.map(_producto =>
          _producto.id === clase.id ? clase : _producto
        );
        this.updateObservers();
      });
  };

  public borrar = (clase: Clase) => {
    return this.httpService
      .post(
        new Modelos.Post(
          "/clase/borrar/",
          { id: clase.id },
          "El clase fue eliminado con exito",
          "Hubo un error al eliminar la clase. Intente nuevamente."
        )
      )
      .then(() => {
        this.datos = this.datos.filter(srv => srv.id !== clase.id);
        this.updateObservers();
      });
  };

  public traerTodos = (): Promise<Array<Clase>> => {
    return this.httpService.mapper(
      this.httpService.get(
        new Modelos.Get(
          "/clase/all",
          "Hubo un error al traer los clases. Intente nuevamente."
        )
      ),
      clases => clases.map(clase => this.builder.fromBackEnd(clase))
    );
  };

  public traerUno = (clase: Clase): Promise<Clase> => {
    return this.httpService.mapper(
      this.httpService.get(
        new Modelos.Get(
          "/clase/find/" + clase.id,
          "Hubo un error al traer la clase. Intente nuevamente."
        )
      ),
      _producto => this.builder.fromBackEnd(_producto)
    );
  };
}
