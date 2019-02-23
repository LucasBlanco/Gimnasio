import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  OnInit
} from "@angular/core";
import { Servicio, ServicioBuilder } from "../../../../models/servicio";
import { HorarioServicio } from "../../../../models/horarioServicio";
import {
  useAnimation,
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
import moment from "moment";
import * as animaciones from "../../animaciones";
import { HttpServiceServicio } from "../../../../services/httpServiceServicio";
import { HttpServiceProfesor } from "../../../../services/httpServiceProfesor";
import { Profesor } from "../../../../models/profesor";

@Component({
  selector: "m-am-servicio",
  templateUrl: "./am-servicio.component.html",
  animations: [
    trigger("slowEnterRight", [
      transition(":enter", [useAnimation(animaciones.enterRightShort)]),
      transition(":leave", [useAnimation(animaciones.exitRightShort)])
    ]),
    trigger("slowEnterUp", [
      transition(":enter", [useAnimation(animaciones.enterUpShort)]),
      transition(":leave", [useAnimation(animaciones.exitUpShort)])
    ])
  ]
})
export class AmServicioComponent implements OnChanges, OnInit {
  ServicioBuilder = new ServicioBuilder();
  @Input() servicioAModificar: Servicio = this.ServicioBuilder.empty();
  @Input() editando: boolean = false;
  @Output("alta") altaEmitter = new EventEmitter<Servicio>();
  @Output("modificar") modificacionEmitter = new EventEmitter<Servicio>();
  @Output("mostrarTabla") irALaTablaEmitter = new EventEmitter<void>();
  servicio: Servicio = this.ServicioBuilder.empty();
  profesores: Profesor[] = [];
  dias = [
    { seleccionado: false, dia: "lunes", horarios: [new HorarioServicio()] },
    { seleccionado: false, dia: "martes", horarios: [new HorarioServicio()] },
    {
      seleccionado: false,
      dia: "miercoles",
      horarios: [new HorarioServicio()]
    },
    { seleccionado: false, dia: "jueves", horarios: [new HorarioServicio()] },
    { seleccionado: false, dia: "viernes", horarios: [new HorarioServicio()] },
    { seleccionado: false, dia: "sabado", horarios: [new HorarioServicio()] },
    { seleccionado: false, dia: "domingo", horarios: [new HorarioServicio()] }
  ];
  mostrando = "horarios";
  ultimoValor;

  constructor(private profesorSrv: HttpServiceProfesor) {}

  ngOnInit() {
    this.profesorSrv.getSubscription().subscribe(profesores => {
      this.profesores = profesores;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.servicio = this.editando
      ? this.servicioAModificar
      : this.ServicioBuilder.empty();
    if (this.editando) {
      this.dias = this.dias.map(d => {
        const { dia, horarios } = this.servicioAModificar.dias.find(
          _horario => _horario.dia === d.dia
        );
        return horarios ? { seleccionado: true, dia, horarios } : d;
      });
    } else {
      this.dias = this.dias.map(({ dia }) => ({
        seleccionado: false,
        dia: dia,
        horarios: [new HorarioServicio()]
      }));
    }
  }

  borrar() {
    this.servicio = this.ServicioBuilder.empty();
    this.dias = this.dias.map(dia => ({
      seleccionado: false,
      dia: dia.dia,
      horarios: [new HorarioServicio()]
    }));
  }

  irALaTabla() {
    this.irALaTablaEmitter.emit();
  }

  enviarEvento() {
    this.servicio.dias = this.dias.filter(dia => dia.seleccionado);
    if (!this.editando) {
      this.altaEmitter.emit(this.servicio);
    } else {
      this.modificacionEmitter.emit(this.servicio);
    }
    this.borrar();
  }

  actualizarRestoDias(hora) {
    this.dias.forEach(dia2 => {
      dia2.horarios.forEach(horario => {
        horario.horaInicio = horario.horaInicio || hora.horaInicio;
        horario.horaFin = horario.horaFin || hora.horaFin;
        horario.entradaDesde = horario.entradaDesde || hora.entradaDesde;
        horario.entradaHasta = horario.entradaHasta || hora.entradaHasta;
      });
    });
  }

  actualizarRestoHorario = (hora, valorAnterior) => {
    if (hora) {
      valorAnterior = moment(valorAnterior, "HH:mm");
      const valorActual = moment(hora.horaInicio, "HH:mm");
      const duracionHoras = moment
        .duration(valorActual.diff(valorAnterior))
        .hours();
      const duracionMinutos = moment
        .duration(valorActual.diff(valorAnterior))
        .minutes();
      hora.horaFin =
        hora.horaFin &&
        moment(hora.horaFin, "HH:mm")
          .add(duracionHoras, "h")
          .add(duracionMinutos, "m")
          .format("HH:mm");
      hora.entradaDesde =
        hora.entradaDesde &&
        moment(hora.entradaDesde, "HH:mm")
          .add(duracionHoras, "h")
          .add(duracionMinutos, "m")
          .format("HH:mm");
      hora.entradaHasta =
        hora.entradaHasta &&
        moment(hora.entradaHasta, "HH:mm")
          .add(duracionHoras, "h")
          .add(duracionMinutos, "m")
          .format("HH:mm");
    }
  };

  actualizarResto = (hora, propiedad) => {
    this.dias.forEach(dia2 => {
      dia2.horarios.forEach(horario => {
        horario[propiedad] = horario[propiedad] || hora[propiedad];
      });
    });
  };

  guardarUltimoValor = hora => (this.ultimoValor = hora);

  hayUnDiaSeleccionado = () => this.dias.some(d => d.seleccionado);

  agregarHorario = dia =>
    dia.horarios.push(
      new HorarioServicio(
        dia.horarios[0].horaInicio,
        dia.horarios[0].horaFin,
        dia.horarios[0].entradaDesde,
        dia.horarios[0].entradaHasta
      )
    );

  eliminarHorario = (dia, i) => dia.horarios.splice(i, 1);

  diasSeleccionados = () => this.dias.filter(d => d.seleccionado);
}
