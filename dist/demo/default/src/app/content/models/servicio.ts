
export class Servicio {

	nombre: string
	horarios: Array<{dia: string, horaInicio: any, horaFin: any, horaEntrada: any}>

	constructor(nombre?, horarios?) {
		this.nombre = (nombre) ? nombre : null
		this.horarios = (horarios) ? horarios : null
	}
}
