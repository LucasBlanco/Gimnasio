import {HorarioServicio} from './horarioServicio'

export class Servicio {

	id?: number;
	nombre: string;
	horarios: Array<{dia: string, horarios: HorarioServicio[]}>;
	registraEntrada: boolean;

	constructor(nombre?, horarios?, registraEntrada?, id?) {
		this.nombre =  nombre || null;
		this.horarios =  horarios || [];
		this.registraEntrada = registraEntrada || true;
		if (id) { this.id = id; }
	}
}
