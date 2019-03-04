import { Component, OnInit } from "@angular/core";
import { HttpServiceServicio } from "../../../../services/httpServiceServicio";
import { Socio } from "../../../../models/socio";
import { HttpServiceClase } from "../../../../services/httpServiceClase";
import { Clase } from "../../../../models/clase";

@Component({
  selector: "m-tomar-presente",
  template: `
    <div class="m-portlet m-portlet--success m-portlet--head-solid-bg">
      <div class="m-portlet__head">
        <div class="m-portlet__head-caption">
          <div class="m-portlet__head-title">
            <span class="m-portlet__head-icon">
              <i style="font-size: 2.2rem;" class="flaticon-edit"></i>
            </span>
            <h3 class="m-portlet__head-text">
              Tomar asistencia
            </h3>
          </div>
        </div>
      </div>

      <div class="m-portlet__body">
        <div *ngIf="mostrarClases">
          <m-lista-clases
            [clases]="clases"
            (mostrarAsistentes)="mostrarAlumnos($event)"
          ></m-lista-clases>
        </div>
        <div *ngIf="!mostrarClases">
          <m-lista-asistentes
            (presenteTomado)="pasarPresente($event)"
            [asistentes]="asistentes"
          ></m-lista-asistentes>
        </div>
      </div>
    </div>
  `
})
export class TomarPresenteComponent implements OnInit {
  clases: Clase[] = [];
  servicios;
  claseTomandosePresente;
  asistentes;
  mostrarClases = true;
  constructor(
    private serviciosSrv: HttpServiceServicio,
    private clasesSrv: HttpServiceClase
  ) {}

  ngOnInit() {
    this.clasesSrv
      .traerClasesEnTranscurso()
      .then(
        clases =>
          (this.clases = clases.map(c => ({ ...c, presentetomado: false })))
      );
  }

  mostrarAlumnos(clase) {
    this.claseTomandosePresente = clase;
    this.asistentes = [];
    this.mostrarClases = false;
  }

  pasarPresente(presentes) {
    console.log("Presentes", presentes);
    const clase = this.claseTomandosePresente;
    this.mostrarClases = true;
    clase.presenteTomado = true;
    this.clases = [this.clases.filter(c => c !== clase), clase];
  }
}
