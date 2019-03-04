export class Producto {
  constructor(
    public concepto: string,
    public precioCompra: number,
    public precioVenta: number,
    public puntoReposicion: number,
    public stock: number,
    public imagen: string,
    public id?: number
  ) {}
}

class ProductoBack {
  constructor(
    public nombre,
    public foto,
    public precio_venta,
    public precio_compra,
    public punto_reposicion,
    public cantidad,
    public id?
  ) {}
}

export class ProductoBuilder {
  static empty() {
    return new Producto(null, null, null, null, null, null);
  }
  static fromBackEnd(pb: ProductoBack) {
    return new Producto(
      pb.nombre,
      pb.precio_compra,
      pb.precio_venta,
      pb.punto_reposicion,
      pb.cantidad,
      `fotos/producto/${pb.id}`,
      pb.id
    );
  }
  static toBackEnd(pf: Producto) {
    return new ProductoBack(
      pf.concepto,
      pf.imagen,
      pf.precioVenta,
      pf.precioCompra,
      pf.puntoReposicion,
      pf.stock
    );
  }
}
