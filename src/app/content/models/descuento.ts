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

  empty() {
    return new Descuento(null, null, null, null, null);
  }

  fromBackEnd(db: DescuentoBack) {
    return new Descuento(
      db.nombre,
      db.vencimiento_dias,
      db.porcentaje,
      db.aplicable_enconjunto,
      db.tipo === 0 ? "membresia" : "socio",
      db.id
    );
  }

  toBackEnd(df: Descuento) {
    return new DescuentoBack(
      df.nombre,
      df.vencimiento,
      df.porcentaje,
      df.aplicableEnConjunto,
      df.tipo === "socio" ? 1 : 0
    );
  }
}
