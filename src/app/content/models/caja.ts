import { Fecha } from "./fecha";

export class Caja {
  constructor(
    public monto: number,
    public concepto: string,
    public observacion: string,
    public tipoDePago: "efectivo" | "credito" | "debito",
    public fecha: Fecha,
    public tipo: 'ingreso' | 'egreso',
    public id?: number
  ) {}
}

class CajaBack {
  constructor(
    public concepto: string,
    public egreso: number,
    public fecha: string,
    public id: number,
    public ingreso: number,
    public observacion: string,
    public tipo_pago: "efectivo" | "credito" | "debito"
  ) {}
}

export class CajaBuilder {
  static empty() {
    return new Caja(null, null, null, null, null, null);
  }
  static fromBackEnd(pb: CajaBack) {
    return new Caja(
      pb.egreso + pb.ingreso,
      pb.concepto,
      pb.observacion,
      pb.tipo_pago,
      new Fecha(pb.fecha),
      pb.ingreso > 0 ? 'ingreso' : 'egreso',
      pb.id
    );
  }
  static toBackEnd(pf: Caja) {
    const {tipoDePago, ...resto} = pf
    return {tipo_pago: tipoDePago, ...resto}
  }
}
