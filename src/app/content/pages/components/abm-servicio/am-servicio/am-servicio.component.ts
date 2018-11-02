import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Servicio} from '../../../../models/servicio';


@Component({
  selector: 'm-am-servicio',
  templateUrl: './am-servicio.component.html',
})
export class AmServicioComponent implements OnChanges {

	@Input() servicioAModificar: Servicio = new Servicio();
	@Input() editando: boolean = false;
	@Output('alta') altaEmitter = new EventEmitter<Servicio>();
	@Output('modificar') modificacionEmitter = new EventEmitter<Servicio>();
	@Output('mostrarTabla') irALaTablaEmitter = new EventEmitter<void>();
	servicio: Servicio = new Servicio();
	dias = [{seleccionado: false, dia: 'lunes', horaInicio: null, horaFin: null, entradaDesde: null, entradaHasta: null},
		{seleccionado: false, dia: 'martes', horaInicio: null, horaFin: null, entradaDesde: null, entradaHasta: null},
		{seleccionado: false, dia: 'miercoles', horaInicio: null, horaFin: null, entradaDesde: null, entradaHasta: null},
		{seleccionado: false, dia: 'jueves', horaInicio: null, horaFin: null, entradaDesde: null, entradaHasta: null},
		{seleccionado: false, dia: 'viernes', horaInicio: null, horaFin: null, entradaDesde: null, entradaHasta: null},
		{seleccionado: false, dia: 'sabado', horaInicio: null, horaFin: null, entradaDesde: null, entradaHasta: null},
		{seleccionado: false, dia: 'domingo', horaInicio: null, horaFin: null, entradaDesde: null, entradaHasta: null}];

  constructor() { }

	ngOnChanges( changes: SimpleChanges) {
		this.servicio = (this.editando) ? this.servicioAModificar : new Servicio();
		if (this.editando) {
			this.dias = this.dias.map( dia => {
				const horario = this.servicioAModificar.horarios.find(_horario => _horario.dia === dia.dia);
				return (horario) ? {seleccionado: true, ...horario} : dia;
			});
		} else {
			this.dias = this.dias.map(({dia}) => 
			({ seleccionado: false, dia: dia, horaInicio: null, horaFin: null, entradaDesde: null, entradaHasta: null})
			)
		}
	}

	borrar() {
		this.servicio = new Servicio();
		this.dias = this.dias.map((dia) => ({seleccionado: false, dia: dia.dia, horaInicio: null, horaFin: null, entradaDesde: null, entradaHasta: null}));
	}

	irALaTabla() {
		this.irALaTablaEmitter.emit();
	}

	enviarEvento() {
  		this.servicio.horarios = this.dias.filter( dia => dia.seleccionado);
		if (!this.editando) {
			this.altaEmitter.emit(this.servicio);
		} else {
			this.modificacionEmitter.emit(this.servicio);
		}
		this.borrar();
	}

	primerDia() {
		return this.dias.find(dia => dia.seleccionado);
	}

	actualizarRestoDias(dia) {
		if (dia.seleccionado && dia === this.primerDia()) {
			this.dias.forEach(
				(dia2) => {
					dia2.horaInicio = dia.horaInicio;
					dia2.horaFin = dia.horaFin;
					dia2.entradaDesde = dia.entradaDesde;
					dia2.entradaHasta = dia.entradaHasta;
				});
		} else {
			if (this.primerDia()) {
				dia = this.primerDia();
				this.dias.forEach(
					(dia2) => {
						dia2.horaFin = dia.horaFin;
						dia2.horaInicio = dia.horaInicio;
						dia2.entradaDesde = dia.entradaDesde;
						dia2.entradaHasta = dia.entradaHasta;
					});
			}
		}
	}

	hayUnDiaSeleccionado = () => this.dias.some(d => d.seleccionado);
}
