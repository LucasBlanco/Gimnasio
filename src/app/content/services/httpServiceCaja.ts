import { Injectable } from "@angular/core";
import { Caja, CajaBuilder } from "../models/caja";
import * as Modelos from "./httpModels";
import { HttpService } from "./httpService";
import moment from "moment";
import { Observable, BehaviorSubject } from "rxjs";
@Injectable()
export class HttpServiceCaja {
  subject = new BehaviorSubject<Caja[]>([]);
  datos: Caja[] = [];

  constructor(private httpService: HttpService) {
    const fechaDesde = moment()
      .subtract(1, "month")
      .format("YYYY-MM-DD");
    const fechaHasta = moment().format("YYYY-MM-DD");
    this.traerTodos(fechaDesde, fechaHasta);
  }

  private updateObservers() {
    this.subject.next(this.datos);
  }

  public getSubscription = (): Observable<any> => {
    return this.subject.asObservable();
  };

  public ingreso(ingreso: Caja) {
    return this.httpService
      .post(
        new Modelos.Post(
          "/caja/ingreso",
          CajaBuilder.toBackEnd(ingreso),
          "El ingreso fue realizado con exito",
          "Hubo un error al realizar el ingreso. Intente nuevamente."
        )
      )
      .then((id: number) => {
        ingreso.id = id;
        this.datos.push(ingreso);
        this.updateObservers();
      });
  }

  public egreso(egreso: Caja) {
    return this.httpService
      .post(
        new Modelos.Post(
          "/caja/egreso",
          CajaBuilder.toBackEnd(egreso),
          "El egreso fue realizado con exito",
          "Hubo un error al realizar el egreso. Intente nuevamente."
        )
      )
      .then((id: number) => {
        egreso.id = id;
        this.datos.push(egreso);
        this.updateObservers();
      });
  }

  public traerTodos(fechaInicio: any, fechaFin: any) {
    return this.httpService
      .mapper(
        this.httpService.post(
          new Modelos.Post(
            "/caja/movimientos",
            { fechaInicio: fechaInicio, fechaFin: fechaFin },
            null,
            "Hubo un error al traer los movimientos. Intente nuevamente."
          )
        ),
        movimientos => movimientos.map(m => CajaBuilder.fromBackEnd(m))
      )
      .then(datos => {
        this.datos = datos;
        this.updateObservers();
      });
  }
}
