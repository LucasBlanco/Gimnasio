export class Profesor {
  constructor(
    public nombre: string,
    public apellido: string,
    public email: string,
    public telefono: string,
    public domicilio: string,
    public sueldo: number,
    public diaCobro: any,
    public intervaloCobro: number,
    public id?: number
  ) {}
}

export class ProfesorBack {
  constructor(
    public nombre: string,
    public apellido: string,
    public email: string,
    public telefono: string,
    public domicilio: string,
    public fijo: number,
    public fecha_cobro_dia: any,
    public cantidad_dias_cobro: number,
    public id?: number
  ) {}
}

export class ProfesorBuilder {
  empty() {
    return new Profesor(null, null, null, null, null, null, null, null);
  }
  fromBackEnd(pb: ProfesorBack) {
    return new Profesor(
      pb.nombre,
      pb.apellido,
      pb.email,
      pb.telefono,
      pb.domicilio,
      pb.fijo,
      pb.fecha_cobro_dia,
      pb.cantidad_dias_cobro,
      pb.id
    );
  }
  toBackEnd(pf: Profesor) {
    return new ProfesorBack(
      pf.nombre,
      pf.apellido,
      pf.email,
      pf.telefono,
      pf.domicilio,
      pf.sueldo,
      pf.diaCobro,
      pf.intervaloCobro
    );
  }
}
