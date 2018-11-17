import { Servicio } from './servicio';
import { Descuento } from './descuento';
import { Socio } from './socio';
import { Membresia } from './membresia';

export class Venta {
    socio: Socio;
    membresia: Membresia;
    descuento: Descuento;
    precio: number;
    fecha: string;
    cantidad: number;
    id: number;

    constructor(precio?, fecha?, cantidad?, socio?, membresia?, descuento?, id?) {
        this.precio = precio || null;
        this.fecha = fecha || null;
        this.cantidad = cantidad || null;
        this.socio = socio || null;
        this.membresia = membresia || [];
        this.descuento = descuento || null;
        this.id = id || null;
    }
}
