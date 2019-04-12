import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Socio } from "../../../../../models/socio";

@Component({
  selector: "m-am-clase-alumnos",
  templateUrl: "./alumnos.component.html"
})
export class AlumnosComponent implements OnInit {
  constructor() {}
  hola;

  @Input() alumnos: Socio[];
  @Output() alumnosSeleccionados = new EventEmitter();

  ngOnInit() {}

  agregarPresentes(alumno) {
    console.log(alumno);
  }
}
