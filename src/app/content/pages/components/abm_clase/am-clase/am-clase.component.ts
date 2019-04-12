import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  OnInit
} from "@angular/core";
import { Clase, ClaseBuilder } from "../../../../models/clase";
import { HttpServiceProfesor } from "../../../../services/httpServiceProfesor";
import { Profesor } from "../../../../models/profesor";
import { HttpServiceServicio } from "../../../../services/httpServiceServicio";
import { Servicio } from "../../../../models/servicio";
import { Fecha } from "../../../../models/fecha";

@Component({
  selector: "m-am-clase",
  templateUrl: "./am-clase.component.html"
})
export class AmClasesComponent implements OnChanges, OnInit {
  clase: Clase;
  @Input() profesorAModificar: Clase = ClaseBuilder.empty();
  @Input() editando: boolean = false;
  @Output("alta") altaEmitter = new EventEmitter<Clase>();
  @Output("modificar") modificacionEmitter = new EventEmitter<Clase>();
  @Output("mostrarTabla") irALaTablaEmitter = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    this.clase = this.editando ? this.profesorAModificar : ClaseBuilder.empty();
  }

  borrarClase() {
    this.clase = ClaseBuilder.empty();
  }

  irALaTabla() {
    this.irALaTablaEmitter.emit();
  }

  enviarEvento() {
    if (!this.editando) {
      this.altaEmitter.emit(this.clase);
    } else {
      this.modificacionEmitter.emit(this.clase);
    }
    this.borrarClase();
  }

  mapFecha = fecha => new Fecha(fecha).back;
}
