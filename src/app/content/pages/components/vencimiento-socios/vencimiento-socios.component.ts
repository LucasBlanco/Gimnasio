import { Component, OnInit, ViewChild } from "@angular/core";
import { Socio } from "../../../models/socio";
import { HttpServiceSocios } from "../../../services/httpServiceSocios";
import { SociosService } from "../socio/serviceSocio";
import { Membresia } from "../../../models/membresia";
import { ElementoLista } from "../../../models/generales";
import { joinPipe } from "../shared-components/tabla/pipesTabla";
import { ListaComponent } from "../shared-components/lista/lista.component";
import { DEFAULT_ARIA_LIVE_DELAY } from "@ng-bootstrap/ng-bootstrap/util/accessibility/live";

@Component({
  selector: "m-vencimiento-socios",
  template: `
    <div class="m-portlet m-portlet--success m-portlet--head-solid-bg">
      <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
          <div class="m-portlet__head-title">
            <span class="m-portlet__head-icon">
              <i class="flaticon-edit"></i>
            </span>
            <h3 class="m-portlet__head-text">
              Tabla de descuentos
            </h3>
          </div>
        </div>
      </div>

      <div class="m-portlet__body">
        <m-tabs
          [tabs]="['Membresias', 'Servicios', 'Proximos vencimientos']"
          [tabSeleccionada]="'Membresias'"
        >
          <m-tabla
            id="Membresias"
            [nombreColumnas]="['/*Apellido', '/*Nombre', 'Membresias']"
            [valorColumnas]="['socio.apellido', 'socio.nombre', 'vencimientos']"
            [pipes]="{
              vencimientos: [joinPipe('membresia.nombre')]
            }"
            [datos]="vencimientosMembresia"
            [acciones]="accionMembresia"
          ></m-tabla>
          <m-tabla
            id="Servicios"
            [nombreColumnas]="['/*Apellido', '/*Nombre', 'Servicios']"
            [valorColumnas]="['apellido', 'nombre', 'vencimientos']"
            [datos]="vencimientoServicio"
            [acciones]="accionServicio"
          ></m-tabla>
        </m-tabs>
      </div>
    </div>

    <m-lista [lista]="detalles" titulo="Vencimientos"></m-lista>
  `
})
export class VencimientoSociosComponent implements OnInit {
  @ViewChild(ListaComponent) modalDetalles: ListaComponent;

  vencimientosMembresia: {
    socio: Socio;
    vencimientos: { membresia: Membresia; fecha: string }[];
  }[] = [];
  vencimientosServicio: {
    socio: Socio;
    vencimientos: {
      servicio: Membresia;
      fecha: string;
      motivo: "vencida" | "sinCreditos";
    }[];
  }[] = [];
  accionMembresia;
  accionServicio;
  detalles: ElementoLista[] = [];
  joinPipe;

  constructor(
    private httpSociosSrv: HttpServiceSocios,
    private sociosSrv: SociosService
  ) {}

  ngOnInit() {
    this.httpSociosSrv.getSubscription().subscribe(socio => {});
    this.joinPipe = joinPipe;
    this.accionMembresia = [
      {
        callback: this.mostrarDetallesMembresia,
        class: "la la-money",
        name: "Ver detalles"
      }
    ];
    this.accionServicio = [
      {
        callback: this.mostrarDetallesServicio,
        class: "la la-money",
        name: "Ver detalles"
      }
    ];
    this.httpSociosSrv.getSubscription().subscribe(socios => {
      this.vencimientosMembresia = socios
        .filter(socio => socio.ventas.some(v => v.requiereNuevaCompra()))
        .map(socio => ({
          socio,
          vencimientos: socio.ventas
            .filter(v => v.requiereNuevaCompra())
            .map(v => ({
              membresia: v.membresia,
              fecha: v.getUltimaCuotaPaga().fechaVto.front
            }))
        }));
      console.log("vencimientos", this.vencimientosMembresia);
      console.log("socios", socios);
    });
  }

  mostrarDetallesMembresia = ({ vencimientos }) => {
    this.detalles = vencimientos.map(v => ({
      label: v.membresia.nombre,
      dato: v.fecha
    }));
    this.modalDetalles.show();
  };
  mostrarDetallesServicio = vencimiento => {
    this.detalles = [];
    this.modalDetalles.show();
  };
}
