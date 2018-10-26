
import {Descuento} from './descuento';

export class Socio {

    nombre: string;
	apellido: string;
    descuento: Descuento;
    fechaNacimiento: any;
	dni: number;
	telefono: string;
	email: string
	direccion: string;
	genero: string;
	id: number;

	constructor(nombre?, apellido?, descuento?, fechaNacimiento?, dni?, telefono?, direccion?, genero?, email?,id?) {
		this.nombre = nombre || null;
		this.dni = dni || null;
		this.apellido = apellido || null;
		this.descuento = descuento || null;
		this.fechaNacimiento = fechaNacimiento || null;
		this.telefono = telefono || null;
		this.direccion = direccion || null;
		this.genero = genero || null;
		this.email = email || null;
		if (id) {this.id = id; }
	}
}
