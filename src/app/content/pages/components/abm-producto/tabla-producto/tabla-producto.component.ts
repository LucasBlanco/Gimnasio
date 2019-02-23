import { Component } from '@angular/core';
import { Tabla } from '../../abm/tabla';

@Component({
  selector: 'm-tabla-producto',
  template: `
    <div class="m-portlet m-portlet--success m-portlet--head-solid-bg">
      <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
          <div class="m-portlet__head-title">
            <span class="m-portlet__head-icon">
              <i style="font-size: 2.2rem;" class="flaticon-kettlebell"></i>
            </span>
            <h3 class="m-portlet__head-text">
              Tabla de servicios
            </h3>
          </div>
        </div>
      </div>
      <div class="m-portlet__body">
        <m-tabla
          [nombreColumnas]="['/*Nombre', '/*Precio compra', '/*Precio venta']"
          [valorColumnas]="['concepto', 'precioCompra', 'precioVenta']"
          [datos]="datos"
          [acciones]="acciones"
          [imagen]="['imagen', '80px']"
          [fallbackImagen]="'./assets/app/media/img/blog/protein.png'"
        ></m-tabla>
      </div>
    </div>
  `
})
export class TablaProductoComponent extends Tabla {}
