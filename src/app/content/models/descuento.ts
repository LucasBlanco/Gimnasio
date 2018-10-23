export class Descuento {
	nombre: string;
	vencimiento: number;
	porcentaje: number;
	aplicableEnConjunto: boolean;
	tipo: 'socio'|'membresia';
	id: number;

	constructor(nombre?, vencimiento?, porcentaje?, aplicableEnConjunto?, tipo?, id?) {
		this.nombre =  nombre || null;
		this.vencimiento =  vencimiento || null;
		this.porcentaje = porcentaje || null;
		this.aplicableEnConjunto = (aplicableEnConjunto ===  undefined || aplicableEnConjunto ===  null) ? false : aplicableEnConjunto;
		this.tipo = tipo || null;
		if (id) { this.id = id; }
	}

}
