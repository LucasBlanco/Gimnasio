import { FormaDePago } from './formaDePago';

export class Socio {

    nombre: string
	apellido: string
    idDescuento: number
    fechaNacimiento: any
	dni: number
	telefono: string
	direccion: string
	id: number

    constructor(nombre?, apellido?, idDescuento?, fechaNacimiento?, dni?, telefono?, direccion?, id?) {
		this.nombre = nombre || null
		this.dni = dni|| null
		this.apellido = apellido|| null
		this.idDescuento = idDescuento || null
		this.fechaNacimiento = fechaNacimiento || null
		this.telefono = telefono || null
		this.direccion = direccion || null
		if(id){this.id = id}
	}
}
