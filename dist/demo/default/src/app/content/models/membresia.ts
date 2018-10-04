import {Servicio} from "./servicio";

export class Membresia {
	nombre: string
	precio: number
	vencimiento: number
	nroCuotas: number
	servicios: Array<Servicio>
	descuentos: Array<number>
	id: number

	constructor(nombre?, precio?, vencimiento?, nroCuotas?, servicios?, descuentos?, id?) {
		this.nombre = nombre || null
		this.precio = precio || null
		this.vencimiento = vencimiento || null
		this.nroCuotas = nroCuotas || null
		this.servicios = servicios || []
		this.descuentos = descuentos || []
		this.id = id || null
	}
}
