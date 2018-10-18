import {Servicio} from "./servicio";
import {Descuento} from "./descuento";

export class Membresia {
	nombre: string
	precio: number
	vencimiento: number
	nroCuotas: number
	servicios: Array<{creditos: number, vencimiento: number, servicio: Servicio}>
	descuentosDisponibles: Array<Descuento>
	descuento: Descuento
	id: number

	constructor(nombre?, precio?, vencimiento?, nroCuotas?, servicios?, descuentosDisponibles?, descuento?, id?) {
		this.nombre = nombre || null
		this.precio = precio || null
		this.vencimiento = vencimiento || null
		this.nroCuotas = nroCuotas || null
		this.servicios = servicios || []
		this.descuentosDisponibles = descuentosDisponibles || []
		this.descuento = descuento || null
		this.id = id || null
	}
}
