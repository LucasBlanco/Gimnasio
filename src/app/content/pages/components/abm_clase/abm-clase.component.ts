import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  OnChanges
} from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { HttpServiceProfesor } from "../../../services/httpServiceProfesor";
import { ABM } from "../abm/abm";
import { Clase } from "../../../models/clase";
import { HttpServiceClase } from "../../../services/httpServiceClase";
import { Fecha } from "../../../models/fecha";
import { NgOnChangesFeature } from "@angular/core/src/render3";

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
        (filtrarClases)="traerClases($event)"
        [datos]="datos"
      ></m-tabla-clase>
    </div>
  `
})
export class AbmClasesComponent extends ABM {
  clases: Clase[];

  constructor(
    public activatedRouter: ActivatedRoute,
    public claseSrv: HttpServiceClase
  ) {
    super(activatedRouter, claseSrv, false, null, null, () =>
      claseSrv.traerTodos(new Fecha().add(-7, "days").back, new Fecha().back)
    );
  }

  traerClases(desde, hasta) {
    this.claseSrv.traerTodos(desde, hasta);
  }
}
