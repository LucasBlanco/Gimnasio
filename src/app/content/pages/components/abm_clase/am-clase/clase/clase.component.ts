import { Component, OnInit, Input } from "@angular/core";
import { Clase } from "../../../../../models/clase";
import { HttpServiceProfesor } from "../../../../../services/httpServiceProfesor";
import { Profesor } from "../../../../../models/profesor";
import { HttpServiceServicio } from "../../../../../services/httpServiceServicio";
import { Servicio } from "../../../../../models/servicio";

@Component({
  selector: "m-am-clase-clase",
  templateUrl: "./clase.component.html"
})
export class ClaseComponent implements OnInit {
  constructor(
    private profesorSrv: HttpServiceProfesor,
    private servicioSrv: HttpServiceServicio
  ) {}
  profesores: Profesor[];
  servicios: Servicio[];

  @Input() clase: Clase;

  ngOnInit() {
    this.profesorSrv.getSubscription().subscribe(p => (this.profesores = p));

    this.servicioSrv.getSubscription().subscribe(ss => (this.servicios = ss));
  }
}
