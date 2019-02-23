
import { Producto } from './producto';
import { Usuario } from './usuario';

export class TransaccionProducto {

	constructor(
        public producto: Producto & {cantidad: number},
        public usuario: Usuario,
        public fecha: string,
        public observacion: string,
        public tipoPago: string,
        public tipo: string,
        public precio: number
    ) {
	}
}
