export class Descuento {
	nombre: string
	vencimiento: number
	porcentaje: number
	aplicableEnConjunto: boolean
	id: number

	constructor(nombre?, vencimiento?, porcentaje?, aplicableEnConjunto?, id?) {
		this.nombre =  nombre || null
		this.vencimiento =  vencimiento || null
		this.porcentaje = porcentaje || null
		this.aplicableEnConjunto = aplicableEnConjunto || null
		if(id){ this.id = id }
	}

}
