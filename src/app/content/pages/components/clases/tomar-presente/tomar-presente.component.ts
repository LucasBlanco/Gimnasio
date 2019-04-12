import { Component, OnInit } from "@angular/core";
import { HttpServiceServicio } from "../../../../services/httpServiceServicio";
import { Socio } from "../../../../models/socio";
import { HttpServiceClase } from "../../../../services/httpServiceClase";
import { Clase } from "../../../../models/clase";

@Component({
  selector: "m-tomar-presente",
  template: `
    <m-portlet-container>
      <m-portlet-header
        [title]="'Tomar asistencia'"
        [icon]="'flaticon-edit'"
      ></m-portlet-header>
      <m-portlet-body>
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
      </m-portlet-body>
    </m-portlet-container>
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
