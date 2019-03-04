import * as Modelos from "./httpModels";
import { Socio, SocioBuilder } from "../models/socio";
import { Membresia, MembresiaBuilder } from "../models/membresia";
import { HttpService } from "./httpService";
import { Injectable } from "@angular/core";
import { Descuento } from "../models/descuento";
import { HttpServiceMembresia } from "./httpServiceMembresia";
import { HttpServiceDescuento } from "./httpServiceDescuento";
import { HttpServiceServicio } from "./httpServiceServicio";
import { Observable } from "rxjs/internal/Observable";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import * as moment from "moment";
import { ServicioBuilder } from "../models/servicio";
import { VentaBack, Venta, Cuota, VentaBuilder } from "../models/venta";

@Injectable()
export class HttpServiceSocios {
  subjectSocios = new BehaviorSubject<Socio[]>([]);
  socios: Socio[] = [];

  constructor(
    private httpService: HttpService,
    private membresiaSrv: HttpServiceMembresia,
    private descuentoSrv: HttpServiceDescuento,
    private servicioSrv: HttpServiceServicio
  ) {
    this.traerTodos().then(socios => {
      this.socios = socios;
      this.updateSociosObservers();
    });
  }

  public getSubscription = (): Observable<any> => {
    return this.subjectSocios.asObservable();
  };

  private updateSociosObservers() {
    this.subjectSocios.next(this.socios);
  }

  public crear = (socio: Socio) => {
    delete socio.id;
    return this.httpService
      .post(
        new Modelos.Post(
          "/socio/crear",
          SocioBuilder.toBackEnd(socio),
          "El socio fue creado con exito",
          "Hubo un error al crear el socio. Intente nuevamente."
        )
      )
      .then((id: number) => {
        socio.id = id;
        this.socios.push(socio);
        this.updateSociosObservers();
      });
  };

  public editar = (socio: Socio) => {
    return this.httpService
      .put(
        new Modelos.Post(
          "/socio/editar/" + socio.id,
          SocioBuilder.toBackEnd(socio),
          "El socio fue modificado con exito",
          "Hubo un error al modificar el socio. Intente nuevamente."
        )
      )
      .then(() => {
        this.socios = this.socios
          .filter(s => s.id !== socio.id)
          .concat([socio]);
        this.updateSociosObservers();
      });
  };

  public traerHistorial(idSocio: number) {
    return this.httpService.mapper(
      this.httpService.get(
        new Modelos.Get(
          "/ventas/historialCompra/" + idSocio,
          "Hubo un error al traer el historial de compras. intente nuevamente"
        )
      ),
      response => response
    );
  }

  public traerAccesos(miSocio: Socio) {
    return this.httpService.mapper(
      this.httpService.get(
        new Modelos.Get(
          "/socio/accesos/" + miSocio.id,
          "Hubo un error al traer los accesos. intente nuevamente"
        )
      ),
      accesos =>
        accesos.map(({ created_at, servicio, ...resto }) => ({
          fecha: created_at,
          servicio: ServicioBuilder.fromBackEnd(servicio)
        }))
    );
  }

  public traerTodos = (): Promise<any> => {
    return this.httpService.mapper(
      this.httpService.get(
        new Modelos.Get(
          "/socio/all",
          "Hubo un error al traer los socios. Intente nuevamente."
        )
      ),
      socios => socios.map(socio => SocioBuilder.fromBackEnd(socio))
    );
  };

  public traerUno = (socio: Socio, id?: number): Promise<any> => {
    return this.httpService.mapper(
      this.httpService.get(
        new Modelos.Get(
          "/socio/find/" + (id ? id : socio.id),
          "Hubo un error al traer el socio. Intente nuevamente."
        )
      ),
      _socio => SocioBuilder.fromBackEnd(_socio)
    );
  };

  public comprar(
    idSocio: number,
    tipoPago: string,
    observacion: string,
    membresias: Array<Membresia>
  ) {
    const membresiasBack = membresias.map(({ id, descuento, ...resto }) => ({
      id: id,
      idDescuento: descuento && descuento.id,
      cantidad: 1
    }));
    return this.httpService
      .post(
        new Modelos.Post(
          "/ventas/crear",
          {
            idSocio: idSocio,
            tipoPago: tipoPago,
            observacion: observacion,
            membresias: membresiasBack
          },
          "La compra fue realizada exitosamente",
          "Hubo un error al realizar la compra. Intente nuevamente."
        )
      )
      .then((ventas: VentaBack[]) => {
        const socio = this.socios.find(s => s.id === idSocio);
        const nuevasVentas = ventas.map(v => VentaBuilder.fromBackEnd(v))
        socio.ventas = socio.ventas.filter(venta => !nuevasVentas.some(v => venta.id === v.id)); // Elimino las ventas repetidas 
        socio.ventas = [...socio.ventas, ...nuevasVentas];
        this.updateSociosObservers();
      });
  }

  public entrarAServicio(idSocio: number, idServicio: number) {
    return this.httpService.post(
      new Modelos.Post(
        "/socio/registrarEntradaAServicio",
        { idSocio: idSocio, idServicio: idServicio },
        "La entrada fue registrada exitosamente",
        "Hubo un error al registrar la entrada. Intente nuevamente."
      )
    );
  }

  public traerVencimientos() {
    return this.traerTodos().then(socios =>
      socios.map(socio => ({ socio, fecha: "2018-10-20" }))
    );
  }

  public eliminarVenta = (idVenta: number, idSocio: number) => {
    return this.httpService
      .post(
        new Modelos.Post(
          "/ventas/borrar",
          { idVenta },
          "La venta fue borrada con exito",
          "Hubo un error al borrar la venta. Intente nuevamente."
        )
      )
      .then(() => {
        const socio = this.socios.find(s => s.id === idSocio);
        socio.ventas = socio.ventas.filter(v => v.id !== idVenta);
        this.updateSociosObservers();
      });
  };

  public cancelarCuota(idVenta: number, idCuota: number, idSocio: number) {
    return this.httpService
      .post(
        new Modelos.Post(
          "/cuotas/cancelarPago",
          { idCuota },
          "El pago de la cuota fue revertido con exito",
          "Hubo un error al revertir el pago de la cuota. Intente nuevamente."
        )
      )
      .then(response => {
        const socio = this.socios.find(s => s.id === idSocio);
        const venta = socio.ventas.find(v => v.id === idVenta);
        const cuota = venta.cuotas.find(c => c.id === idCuota);
        cuota.pagada = false;
        this.updateSociosObservers();
      });
  }
}
