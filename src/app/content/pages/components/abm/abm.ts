import { ActivatedRoute, Params } from "@angular/router";
import { OnDestroy, OnInit, ChangeDetectorRef } from "@angular/core";
import { Fecha } from "../../../models/fecha";

export abstract class ABM implements OnDestroy, OnInit {
  public editando: boolean;
  public mostrarAlta: boolean;
  alta: Function;
  traerUno: Function;
  editar: Function;
  borrar: Function;
  traerTodos: Function;
  datoSeleccionado;
  subscription;
  datos;
  dataServiceSubscription;
  datosEnMemoria: boolean = true;

  constructor(
    public activatedRouter: ActivatedRoute,
    public srv,
    datosEnMemoria?,
    alta?,
    traerUno?,
    traerTodos?,
    borrar?,
    editar?,
    dataServiceSub?
  ) {
    this.activatedRouter.params.subscribe((params: Params) => {
      this.mostrarAlta = params["view"] === "am";
      this.editando = false;
    });
    this.datosEnMemoria =
      datosEnMemoria === undefined || datosEnMemoria === null
        ? true
        : datosEnMemoria;
    this.alta = alta || srv.crear;
    this.traerUno = traerUno || srv.traerUno;
    this.borrar = borrar || srv.borrar;
    this.traerTodos = traerTodos || srv.traerTodos;
    this.editar = editar || srv.editar;
    this.dataServiceSubscription =
      dataServiceSub ||
      (srv.hasOwnProperty("getSubscription") && srv.getSubscription());
  }
  ngOnInit() {
    if (this.datosEnMemoria) {
      this.subscription = this.dataServiceSubscription.subscribe(datos => {
        this.datos = datos;
      });
    } else {
      this.subscription = this.dataServiceSubscription.subscribe(datos => {
        this.datos = datos;
      });
      this.traerTodos();
    }
  }

  realizarAlta(dato) {
    this.alta(dato);
  }

  cargarDatosModificacion(dato) {
    this.datoSeleccionado = dato;
    this.editando = true;
    this.mostrarAlta = true;
    /*this.traerUno(dato).then(_dato => {
      this.datoSeleccionado = _dato;
      this.editando = true;
      this.mostrarAlta = true;
    });*/
  }

  realizarModificacion(dato) {
    this.editar(dato).then(() => {
      this.mostrarAlta = false;
    });
  }

  realizarBaja(dato) {
    this.borrar(dato);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription && this.subscription.unsubscribe();
  }
}
