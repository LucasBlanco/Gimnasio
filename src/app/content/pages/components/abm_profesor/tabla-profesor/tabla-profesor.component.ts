import { Component } from "@angular/core";
import { Tabla } from "../../abm/tabla";

@Component({
  selector: "m-tabla-profesores",
  template: `
    <div class="m-portlet m-portlet--success m-portlet--head-solid-bg">
      <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
          <div class="m-portlet__head-title">
            <span class="m-portlet__head-icon">
              <i style="font-size: 2.2rem;" class="flaticon-avatar"></i>
            </span>
            <h3 class="m-portlet__head-text">
              Tabla de profesores
            </h3>
          </div>
        </div>
      </div>

      <div class="m-portlet__body">
        <m-tabla
          [nombreColumnas]="[
            '/*Nombre',
            '/*Apellido',
            'Telefono',
            'Mail',
            'Domicilio',
            'Sueldo',
            'Dia de cobro',
            'Intervalo de cobro'
          ]"
          [valorColumnas]="[
            'nombre',
            'apellido',
            'telefono',
            'email',
            'domicilio',
            'sueldo',
            'diaCobro',
            'intervaloCobro'
          ]"
          [datos]="datos"
          [acciones]="acciones"
        ></m-tabla>
      </div>
    </div>
  `
})
export class TablaProfesoresComponent extends Tabla {}
