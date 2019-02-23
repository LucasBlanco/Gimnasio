export class Caja {
  constructor(
    public monto: number,
    public concepto: string,
    public observacion: string,
    public tipoDePago: "efectivo" | "credito",
    public fecha: any,
    public id?: number
  ) {}
}

class CajaBack {
  constructor(
    public monto: number,
    public concepto: string,
    public observacion: string,
    public tipoPago: "efectivo" | "credito",
    public fecha?: any,
    public id?: number
  ) {}
}

export class CajaBuilder {
  empty() {
    return new Caja(null, null, null, null, null);
  }
  fromBackEnd(pb: CajaBack) {}
  toBackEnd() {}
}
