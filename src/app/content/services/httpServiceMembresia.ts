import * as Modelos from "./httpModels";
import { HttpService } from "./httpService";
import { Membresia, MembresiaBuilder } from "../models/membresia";
import { Injectable } from "@angular/core";
import { Servicio } from "../models/servicio";
import { Descuento } from "../models/descuento";
import { BehaviorSubject, Observable } from "rxjs";

// 1: membresia, 2: socio
@Injectable()
export class HttpServiceMembresia {
  builder = new MembresiaBuilder();
  subject = new BehaviorSubject<Membresia[]>([]);
  datos: Membresia[] = [];

  constructor(private httpService: HttpService) {
    this.traerTodosCompleto().then(datos => {
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

  public crear = (membresia: Membresia) => {
    delete membresia.id;
    return this.httpService
      .post(
        new Modelos.Post(
          "/membresia/crear",
          this.builder.toBackEnd(membresia),
          "La membresia fue creada con exito",
          "Hubo un error al crear la membresia. Intente nuevamente."
        )
      )
      .then((id: number) => {
        membresia.id = id;
        this.datos.push(membresia);
        this.updateObservers();
      });
  };

  public editar = (membresia: Membresia) => {
    return this.httpService
      .put(
        new Modelos.Post(
          "/membresia/editar/" + membresia.id,
          this.builder.toBackEnd(membresia),
          "La membresia fue editada con exito",
          "Hubo un error al editar la membresia. Intente nuevamente."
        )
      )
      .then(() => {
        this.datos = this.datos.map(_membresia =>
          _membresia.id === membresia.id ? membresia : _membresia
        );
        this.updateObservers();
      });
  };

  public borrar = (membresia: Membresia) => {
    return this.httpService
      .post(
        new Modelos.Post(
          "/membresia/borrar/",
          { id: membresia.id },
          "La membresia fue eliminada con exito",
          "Hubo un error al eliminar la membresia. Intente nuevamente."
        )
      )
      .then(() => {
        this.datos = this.datos.filter(m => m.id !== membresia.id);
        this.updateObservers();
      });
  };

  public traerTodos = (): Promise<any> => {
    return this.httpService.mapper(
      this.httpService.get(
        new Modelos.Get(
          "/membresia/all",
          "Hubo un error al traer las membresias. Intente nuevamente."
        )
      ),
      membresias =>
        membresias.map(membresia => this.builder.fromBackEnd(membresia))
    );
  };

  public traerTodosCompleto = (): Promise<any> => {
    return this.httpService.mapper(
      this.httpService.get(
        new Modelos.Get(
          "/membresia/allConTodo",
          "Hubo un error al traer las membresias. Intente nuevamente."
        )
      ),
      membresias =>
        membresias.map(membresia => this.builder.fromBackEnd(membresia))
    );
  };

  public traerUno = (membresia: Membresia): Promise<any> => {
    return this.httpService.mapper(
      this.httpService.get(
        new Modelos.Get(
          "/membresia/find/" + membresia.id,
          "Hubo un error al traer la membresia. Intente nuevamente."
        )
      ),
      _membresia => this.builder.fromBackEnd(_membresia)
    );
  };
}
