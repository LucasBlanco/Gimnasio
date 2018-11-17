export class Profesor {
   nombre: string
   apellido: string
   email: string
   telefono: string
   domicilio: string
   sueldo: number
   diaCobro: Date
   intervaloCobro: number
    id: number

    constructor(nombre?, apellido?, email?, telefono?, domicilio?, sueldo?, diaCobro?, intervaloCobro?, id?) {
        this.nombre = nombre || null;
        this.apellido = apellido || null;
        this.email = email || null; 
        this.telefono = telefono || null;
        this.domicilio = domicilio || null;
        this.sueldo = sueldo || null;
        this.diaCobro = diaCobro || null;
        this.intervaloCobro = intervaloCobro || null;
        this.id = id || null;
    }
}
