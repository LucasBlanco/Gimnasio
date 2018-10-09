import {Servicio} from "./servicio";
import {Descuento} from "./descuento";

export class Membresia {
	nombre: string
	precio: number
	vencimiento: number
	nroCuotas: number
	servicios: Array<{creditos: number, vencimiento: number, servicio: Servicio}>
	descuentos: Array<Descuento>
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
