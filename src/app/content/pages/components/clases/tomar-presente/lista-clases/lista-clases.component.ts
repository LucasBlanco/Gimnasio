import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "m-lista-clases",
  templateUrl: "./lista-clases.component.html"
})
export class ListaClasesComponent implements OnInit {
  @Output() mostrarAsistentes = new EventEmitter();
  @Input() clases = [];
  constructor() {}

  elegirClase(clase) {
    this.mostrarAsistentes.emit(clase);
  }

  ngOnInit() {}
}
