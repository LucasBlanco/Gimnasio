import { Injectable } from "@angular/core";
import * as Modelos from "./httpModels";
import { HttpService } from "./httpService";
import moment from "moment";
import { Observable, BehaviorSubject } from "rxjs";
import { Clase, ClaseBuilder } from "../models/clase";
@Injectable()
export class HttpServiceClase {
  subject = new BehaviorSubject<Clase[]>([]);
  datos: Clase[] = [];

  constructor(private httpService: HttpService) {}

  private updateObservers() {
    this.subject.next(this.datos);
  }

  public getSubscription = (): Observable<any> => {
    return this.subject.asObservable();
  };

  public crear = (clase: Clase) => {
    delete clase.id;
    return this.httpService
      .post(
        new Modelos.Post(
          "/clase/crear",
          ClaseBuilder.toBackEnd(clase),
          "El clase fue creado con exito",
          "Hubo un error al crear la clase. Intente nuevamente."
        )
      )
      .then((id: number) => {
        clase.id = id;
        this.datos = [...this.datos, clase];
        this.updateObservers();
      });
  };

  public editar = (clase: Clase) => {
    return this.httpService
      .put(
        new Modelos.Post(
          "/clase/editar/" + clase.id,
          ClaseBuilder.toBackEnd(clase),
          "El clase fue editado con exito",
          "Hubo un error al editar la clase. Intente nuevamente."
        )
      )
      .then(() => {
        let _clase = this.datos.find(d => d.id === clase.id);
        _clase = clase;
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

  public traerTodos = (fechaDesde, fechaHasta): Promise<Array<Clase>> => {
    return (this.httpService.mapper(
      this.httpService.post(
        new Modelos.Post(
          "/clase/all",
          { fechaDesde: fechaDesde, fechaHasta: fechaHasta },
          null,
          "Hubo un error al traer los clases. Intente nuevamente."
        )
      ),
      clases => clases.map(clase => ClaseBuilder.fromBackEnd(clase))
    ) as any).then(clases => {
      this.datos = clases;
      this.updateObservers();
    });
  };

  public traerClasesDelDia() {
    return this.httpService.mapper(
      this.httpService.get(
        new Modelos.Get(
          "/clase/delDia",
          "Hubo un error al traer las clases. Intente nuevamente."
        )
      ),
      clases => clases.map(clase => ClaseBuilder.fromBackEnd(clase))
    );
  }

  public traerClasesEnTranscurso() {
    return this.httpService.mapper(
      this.httpService.get(
        new Modelos.Get(
          "/clase/enTranscurso",
          "Hubo un error al traer las clases. Intente nuevamente."
        )
      ),
      clases => clases.map(clase => ClaseBuilder.fromBackEnd(clase))
    );
  }

  public traerUno = (clase: Clase): Promise<Clase> => {
    return this.httpService.mapper(
      this.httpService.get(
        new Modelos.Get(
          "/clase/find/" + clase.id,
          "Hubo un error al traer la clase. Intente nuevamente."
        )
      ),
      _producto => ClaseBuilder.fromBackEnd(_producto)
    );
  };
}
