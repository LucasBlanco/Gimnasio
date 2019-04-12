import {
  Component,
  OnChanges,
  Output,
  EventEmitter,
  OnInit
} from "@angular/core";
import { Tabla } from "../../abm/tabla";
import { joinPipe } from "../../shared-components/tabla/pipesTabla";

@Component({
  selector: "m-tabla-clase",
  template: `
    <div class="m-portlet m-portlet--success m-portlet--head-solid-bg">
      <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
          <div class="m-portlet__head-title">
            <span class="m-portlet__head-icon">
              <i style="font-size: 2.2rem;" class="flaticon2-muscle"></i>
            </span>
            <h3 class="m-portlet__head-text">
              Tabla de clases
            </h3>
          </div>
        </div>
      </div>

      <div class="m-portlet__body">
        <form
          class="form-group m-form__group row"
          (submit)="filtrar(desde.value, hasta.value)"
          ngNativeValidate
        >
          <label class="col-lg-2 col-form-label">Fecha desde:</label>
          <div class="col-lg-3">
            <input type="date" class="form-control m-input" #desde required />
          </div>
          <label class="col-lg-2 col-form-label">Fecha hasta:</label>
          <div class="col-lg-3">
            <input type="date" class="form-control m-input" #hasta required />
          </div>
          <div class="col-lg-auto d-flex justify-content-end pt-2 pt-lg-0">
            <button
              type="submit"
              class="btn btn-brand m-btn m-btn--icon m-btn--icon-only m-btn--custom m-btn--pill "
            >
              <i class="la la-filter" style="color:white"></i>
            </button>
          </div>
        </form>

        <div class="m-separator m-separator--dashed m-separator--lg"></div>
        <m-tabla
          [nombreColumnas]="[
            'Fecha',
            'Inicio',
            'Fin',
            'Entrada desde',
            'Entrada hasta',
            'Servicio',
            'Profesores',
            'Cant alumnos'
          ]"
          [valorColumnas]="[
            'fecha.front',
            'horaInicio',
            'horaFin',
            'entradaDesde',
            'entradaHasta',
            'servicio.nombre',
            'profesores',
            'alumnos.length'
          ]"
          [datos]="datos"
          [pipes]="{ profesores: [joinPipe('nombre')] }"
          [acciones]="acciones"
        ></m-tabla>
      </div>
    </div>
  `
})
export class TablaClasesComponent extends Tabla implements OnChanges, OnInit {
  datosMapeados;
  joinPipe;
  @Output() filtrarClases = new EventEmitter();

  ngOnInit() {
    this.joinPipe = joinPipe;
  }
  ngOnChanges() {
    console.log("DATOS", this.datos);
    this.datosMapeados = this.getClases();
  }

  filtrar(desde: string, hasta: string) {
    this.filtrarClases.emit({ desde, hasta });
  }

  getClases() {
    return this.datos.map(d => ({
      profesoresMostrar: d.profesores.map(p => p.nombre).join(","),
      ...d
    }));
  }
}
