import { Producto } from './producto';

export class CompraProducto {
  constructor(
    public productos: (Producto & { cantidad: number })[] = [],
    private observacion: string = null,
    private tipoPago: 'efectivo' | 'credito' = null
  ) {}

  mapToBackEnd() {
    const productos = this.productos.map(({ id, cantidad }) => ({
      id,
      cantidad
    }));
    return new CompraProductoBack(productos, this.observacion, this.tipoPago);
  }

}

class CompraProductoBack {
  constructor(
    private productos: { id: number; cantidad: number }[],
    private observacion: string,
    private tipoPago: string
  ) {}
}
