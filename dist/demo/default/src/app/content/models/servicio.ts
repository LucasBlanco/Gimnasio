
export class Servicio {

	id?: number
	nombre: string
	horarios: Array<{dia: string, horaInicio: any, horaFin: any, entradaDesde: any, entradaHasta: any}>

	constructor(nombre?, horarios?, id?) {
		this.nombre = (nombre) ? nombre : null
		this.horarios = (horarios) ? horarios : null
		if(id){ this.id = id}
	}
}
