import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpServiceServicio } from '../../../services/httpServiceServicio';
import { ABM } from '../abm/abm';
import { HttpServiceProducto } from '../../../services/httpServiceProducto';

@Component({
  selector: 'm-abm-producto',
  template: `
    <div *ngIf="mostrarAlta">
      <m-am-producto
        (alta)="realizarAlta($event)"
        (modificar)="realizarModificacion($event)"
        (mostrarTabla)="this.mostrarAlta = false"
        [productoAModificar]="datoSeleccionado"
        [editando]="editando"
      ></m-am-producto>
    </div>
    <div *ngIf="!mostrarAlta">
      <m-tabla-producto
        (modificar)="cargarDatosModificacion($event)"
        (baja)="realizarBaja($event)"
        [datos]="datos"
      ></m-tabla-producto>
    </div>
  `
})
export class AbmProductoComponent extends ABM {
  constructor(
    public activatedRouter: ActivatedRoute,
    private productoSrv: HttpServiceProducto
  ) {
    super(activatedRouter, productoSrv);
  }
}
