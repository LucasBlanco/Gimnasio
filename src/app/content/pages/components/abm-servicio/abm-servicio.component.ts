import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Servicio } from '../../../models/servicio';
import { HttpServiceServicio } from '../../../services/httpServiceServicio';
import { ABM } from '../abm/abm';

@Component({
  selector: 'm-membresia',
  template: `
    <div *ngIf="mostrarAlta">
      <m-am-servicio
        (alta)="realizarAlta($event)"
        (modificar)="realizarModificacion($event)"
        (mostrarTabla)="this.mostrarAlta = false"
        [servicioAModificar]="datoSeleccionado"
        [editando]="editando"
      ></m-am-servicio>
    </div>
    <div *ngIf="!mostrarAlta">
      <m-tabla-servicio
        (modificar)="cargarDatosModificacion($event)"
        (baja)="realizarBaja($event)"
        [datos]="datos"
      ></m-tabla-servicio>
    </div>
  `
})
export class AbmServicioComponent extends ABM {
  constructor(
    public activatedRouter: ActivatedRoute,
    private servicioSrv: HttpServiceServicio
  ) {
    super(activatedRouter, servicioSrv);
  }
}
