import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Membresia } from "../../../models/membresia";
import { HttpServiceMembresia } from "../../../services/httpServiceMembresia";
import { ABM } from "../abm/abm";

@Component({
  selector: "m-membresia",
  template: `
    <div *ngIf="mostrarAlta">
      <m-am-membresia
        (alta)="realizarAlta($event)"
        (modificar)="realizarModificacion($event)"
        (mostrarTabla)="this.mostrarAlta = false"
        [membresiaAModificar]="datoSeleccionado"
        [editando]="editando"
      ></m-am-membresia>
    </div>
    <div *ngIf="!mostrarAlta">
      <m-tabla-membresia
        (modificar)="cargarDatosModificacion($event)"
        (baja)="realizarBaja($event)"
        [datos]="datos"
      ></m-tabla-membresia>
    </div>
  `
})
export class AbmMembresiaComponent extends ABM {
  datos: Array<Membresia> = [];
  datoSeleccionado: Membresia;

  constructor(
    public activatedRouter: ActivatedRoute,
    public membresiaSrv: HttpServiceMembresia
  ) {
    super(activatedRouter, membresiaSrv);
  }
}
