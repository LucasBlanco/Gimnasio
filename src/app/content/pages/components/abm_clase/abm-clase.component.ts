import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { HttpServiceProfesor } from "../../../services/httpServiceProfesor";
import { ABM } from "../abm/abm";
import { Clase } from "../../../models/clase";
import { HttpServiceClase } from "../../../services/httpServiceClase";

@Component({
  selector: "m-abm-clase",
  template: `
    <div *ngIf="mostrarAlta">
      <m-am-clase
        (alta)="realizarAlta($event)"
        (modificar)="realizarModificacion($event)"
        (mostrarTabla)="this.mostrarAlta = false"
        [profesorAModificar]="datoSeleccionado"
        [editando]="editando"
      ></m-am-clase>
    </div>
    <div *ngIf="!mostrarAlta">
      <m-tabla-clase
        (modificar)="cargarDatosModificacion($event)"
        (baja)="realizarBaja($event)"
        [datos]="datos"
      ></m-tabla-clase>
    </div>
  `
})
export class AbmClasesComponent extends ABM {
  datos: Array<Clase> = [];
  datoSeleccionado: Clase;

  constructor(
    public activatedRouter: ActivatedRoute,
    public claseSrv: HttpServiceClase
  ) {
    super(activatedRouter, claseSrv);
  }
}
