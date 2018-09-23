import { FormaDePago } from './formaDePago';

export class Socio {

    nombre: string
	apellido: string
    idDescuento: number
    fechaNacimiento: any
	dni: number
	telefono: string
	direccion: string

    constructor(nombre?, apellido?, idDescuento?, fechaNacimiento?, dni?, telefono?, direccion?) {
		this.nombre = (nombre) ? nombre : null
		this.dni = (dni) ? dni : null
		this.apellido = (apellido) ? apellido : null
		this.idDescuento = (idDescuento) ? idDescuento : null
		this.fechaNacimiento = (fechaNacimiento) ? fechaNacimiento : null
		this.telefono = (telefono) ? telefono : null
		this.direccion = (direccion) ? direccion : null
	}
}
