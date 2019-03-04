import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Socio } from "../../../../../models/socio";

@Component({
  selector: "m-lista-asistentes",
  templateUrl: "./lista-asistentes.component.html"
})
export class ListaAsistentesComponent implements OnInit {
  @Input() asistentes: Socio[] = [];
  @Output() presenteTomado = new EventEmitter();
  presentes: Socio[] = [];

  constructor() {}

  ngOnInit() {}

  tomarPresente() {
    this.presenteTomado.emit(this.presentes);
  }
}
