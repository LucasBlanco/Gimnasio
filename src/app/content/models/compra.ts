import { Membresia } from './membresia';
import { Socio } from './socio'

export class Compra {
    membresias: Membresia[]
    socio: Socio
    id: Number

    constructor(socio?, membresias?, id?) {
        this.socio = socio || null
        this.membresias = membresias || []
        this.id = id || null
    }
}
