import { FormaDePago } from './formaDePago';

export class Socio {

    nombre: string
	apellido: string
    email: string
    fechaNacimiento: any
	fechaIngreso: any
	dni: number
	telefono: string
	direccion: string

    constructor(nombre?, apellido?, email?, fechaNacimiento?, dni?, telefono?, direccion?) {
		this.nombre = (nombre) ? nombre : null
		this.dni = (dni) ? dni : null
		this.apellido = (apellido) ? apellido : null
		this.email = (email) ? email : null
		this.fechaNacimiento = (fechaNacimiento) ? fechaNacimiento : null
		this.telefono = (telefono) ? telefono : null
		this.direccion = (direccion) ? direccion : null
	}
}
