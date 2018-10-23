
export class Servicio {

	id?: number;
	nombre: string;
	horarios: Array<{dia: string, horaInicio: any, horaFin: any, entradaDesde: any, entradaHasta: any}>;
	registraEntrada: boolean;

	constructor(nombre?, horarios?, registraEntrada?, id?) {
		this.nombre =  nombre || null;
		this.horarios =  horarios || null;
		this.registraEntrada = registraEntrada || true;
		if (id) { this.id = id; }
	}
}
