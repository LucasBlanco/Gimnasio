import * as Modelos from "./httpModels";
import { HttpService } from "./httpService";
import { Servicio, ServicioBuilder } from "../models/servicio";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
@Injectable()
export class HttpServiceServicio {
  subject = new BehaviorSubject<Servicio[]>([]);
  datos: Servicio[] = [];

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

  public crear = (servicio: Servicio) => {
    delete servicio.id;
    return this.httpService
      .post(
        new Modelos.Post(
          "/servicio/crear",
          ServicioBuilder.toBackEnd(servicio),
          "El servicio fue creado con exito",
          "Hubo un error al crear el servicio. Intente nuevamente."
        )
      )
      .then((id: number) => {
        servicio.id = id;
        this.datos.push(servicio);
        this.updateObservers();
      });
  };

  public editar = (servicio: Servicio) => {
    return this.httpService
      .put(
        new Modelos.Post(
          "/servicio/editar/" + servicio.id,
          ServicioBuilder.toBackEnd(servicio),
          "El servicio fue editado con exito",
          "Hubo un error al editar el servicio. Intente nuevamente."
        )
      )
      .then(() => {
        this.datos = this.datos.map(_servicio =>
          _servicio.id === servicio.id ? servicio : _servicio
        );
        this.updateObservers();
      });
  };

  public borrar = (servicio: Servicio) => {
    return this.httpService
      .post(
        new Modelos.Post(
          "/servicio/borrar/",
          { id: servicio.id },
          "El servicio fue eliminado con exito",
          "Hubo un error al eliminar el servicio. Intente nuevamente."
        )
      )
      .then(() => {
        this.datos = this.datos.filter(srv => srv.id !== servicio.id);
        this.updateObservers();
      });
  };

  public traerTodos = (): Promise<Array<Servicio>> => {
    return this.httpService.mapper(
      this.httpService.get(
        new Modelos.Get(
          "/servicio/all",
          "Hubo un error al traer los servicios. Intente nuevamente."
        )
      ),
      servicios => servicios.map(servicio => ServicioBuilder.fromBackEnd(servicio))
    );
  };

  public traerUno = (servicio: Servicio): Promise<Servicio> => {
    return this.httpService.mapper(
      this.httpService.get(
        new Modelos.Get(
          "/servicio/find/" + servicio.id,
          "Hubo un error al traer el servicio. Intente nuevamente."
        )
      ),
      _servicio => ServicioBuilder.fromBackEnd(_servicio)
    );
  };
}
