class Rebaja {
  constructor(
    public rebajaMembresia: number,
    public rebajaSocio: number,
    public rebajaTotal: number,
    public precioFinal: number
  ) {}
}

export class Descuento {
  aplicableEnConjunto: boolean;
  constructor(
    public nombre: string,
    public vencimiento: any,
    public porcentaje: number,
    aplicableEnConjunto: boolean,
    public tipo: "socio" | "membresia",
    public id?
  ) {
    this.aplicableEnConjunto = aplicableEnConjunto
      ? aplicableEnConjunto
      : false;
  }

  disminuirPrecioConDetalle(precio: number) {
    const precioFinal = precio * (this.porcentaje / 100);
    const rebaja = (precio * this.porcentaje) / 100;
    if (this.tipo === "socio") {
      return new Rebaja(0, rebaja, rebaja, precioFinal);
    }
    if (this.tipo === "membresia") {
      return new Rebaja(rebaja, 0, rebaja, precioFinal);
    }
    return new Rebaja(0, 0, 0, precio);
  }

  disminuirPrecio(precio: number) {
    return this.disminuirPrecioConDetalle(precio).precioFinal;
  }

  getRebaja(precio: number) {
    return this.disminuirPrecioConDetalle(precio).rebajaTotal;
  }

  aumentarPrecio(precio: number) {
    return precio / (1 - this.porcentaje / 100);
  }
}

export class DescuentoFusionEnConjunto {
  constructor(private descuentoM: Descuento, private descuentoS: Descuento) {}
  disminuirPrecioConDetalle(precio: number) {
    const diferenciaM = this.descuentoM.getRebaja(precio);
    const diferenciaS = this.descuentoS.getRebaja(diferenciaM);
    const rebajaTotal = diferenciaM + diferenciaS;
    const precioFinal = precio - rebajaTotal;
    return new Rebaja(diferenciaM, diferenciaS, rebajaTotal, precioFinal);
  }

  disminuirPrecio(precio: number) {
    return this.disminuirPrecioConDetalle(precio).precioFinal;
  }

  getRebaja(precio: number) {
    return this.disminuirPrecioConDetalle(precio).rebajaTotal;
  }

  aumentarPrecio(precio: number) {
    return this.descuentoS.aumentarPrecio(
      this.descuentoM.aumentarPrecio(precio)
    );
  }
}

export class DescuentoFusionNormal {
  constructor(private descuentoM: Descuento, private descuentoS: Descuento) {}
  disminuirPrecioConDetalle(precio: number) {
    const diferenciaM = this.descuentoM.getRebaja(precio);
    const diferenciaS = this.descuentoS.getRebaja(precio);
    const rebajaTotal = diferenciaM + diferenciaS;
    const precioFinal = precio - rebajaTotal;
    return new Rebaja(diferenciaM, diferenciaS, rebajaTotal, precioFinal);
  }

  disminuirPrecio(precio: number) {
    return this.disminuirPrecioConDetalle(precio).precioFinal;
  }

  getRebaja(precio: number) {
    return this.disminuirPrecioConDetalle(precio).rebajaTotal;
  }

  aumentarPrecio(precio: number) {
    return (
      precio /
      (1 - this.descuentoM.porcentaje / 100 - this.descuentoS.porcentaje / 100)
    );
  }
}

export class DescuentoBack {
  constructor(
    public nombre: string,
    public vencimiento_dias: number,
    public porcentaje: number,
    public aplicable_enconjunto: boolean,
    public tipo: 0 | 1,
    public id?: number
  ) {}
}

export class DescuentoBuilder {
  constructor() {}

  static empty() {
    return new Descuento(null, null, null, null, null);
  }

  static fusion(descuento: Descuento, otroDescuento: Descuento) {
    if (!descuento && !otroDescuento) {
      return new Descuento(null, null, 0, false, null);
    }
    if (descuento && !otroDescuento) {
      return descuento;
    }
    if (!descuento && otroDescuento) {
      return otroDescuento;
    }
    if (descuento.aplicableEnConjunto || otroDescuento.aplicableEnConjunto) {
      return new DescuentoFusionEnConjunto(descuento, otroDescuento);
    } else {
      return new DescuentoFusionNormal(descuento, otroDescuento);
    }
  }

  static fromBackEnd(db: DescuentoBack) {
    return new Descuento(
      db.nombre,
      db.vencimiento_dias,
      db.porcentaje,
      db.aplicable_enconjunto,
      db.tipo === 0 ? "membresia" : "socio",
      db.id
    );
  }

  static toBackEnd(df: Descuento) {
    return new DescuentoBack(
      df.nombre,
      df.vencimiento,
      df.porcentaje,
      df.aplicableEnConjunto,
      df.tipo === "socio" ? 1 : 0
    );
  }
}
