import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  OnInit
} from '@angular/core';
import { Clase, ClaseBuilder } from '../../../../models/clase';
import { HttpServiceProfesor } from '../../../../services/httpServiceProfesor';
import { Profesor } from '../../../../models/profesor';
import { HttpServiceServicio } from '../../../../services/httpServiceServicio';
import { Servicio } from '../../../../models/servicio';

@Component({
  selector: 'm-am-clase',
  templateUrl: './am-clase.component.html'
})
export class AmClasesComponent implements OnChanges, OnInit {
  clase: Clase;
  ClaseBuilder = new ClaseBuilder()
  profesores: Profesor[] = [];
  servicios: Servicio[] = [];
  @Input() profesorAModificar: Clase = this.ClaseBuilder.empty();
  @Input() editando: boolean = false;
  @Output('alta') altaEmitter = new EventEmitter<Clase>();
  @Output('modificar') modificacionEmitter = new EventEmitter<Clase>();
  @Output('mostrarTabla') irALaTablaEmitter = new EventEmitter<void>();
  constructor(
    private profesorSrv: HttpServiceProfesor,
    private servicioSrv: HttpServiceServicio
  ) {}

  ngOnInit() {
    this.profesorSrv.getSubscription().subscribe(p => (this.profesores = p));
    this.servicioSrv
      .getSubscription()
      .subscribe(ss => (this.servicios = ss.map(s => s.servicio)));
  }
  ngOnChanges(changes: SimpleChanges) {
    this.clase = this.editando ? this.profesorAModificar : this.ClaseBuilder.empty();
  }

  borrarClase() {
    this.clase = this.ClaseBuilder.empty();
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
}
