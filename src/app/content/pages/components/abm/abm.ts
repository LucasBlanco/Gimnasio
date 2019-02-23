import { ActivatedRoute, Params } from "@angular/router";
import { OnDestroy, OnInit } from "@angular/core";
import { HttpServiceMembresia } from "../../../services/httpServiceMembresia";
import { coerceBooleanProperty } from "@angular/cdk/coercion";

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

  constructor(
    public activatedRouter: ActivatedRoute,
    public srv,
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
    if (this.dataServiceSubscription) {
      this.subscription = this.dataServiceSubscription.subscribe(datos => {
        this.datos = datos;
      });
    } else {
      this.traerTodos().then(datos => (this.datos = datos));
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
