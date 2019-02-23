import { Servicio, ServicioBack } from "./servicio";
import { Descuento, DescuentoBack, DescuentoBuilder } from "./descuento";

export class Membresia {
  constructor(
    public nombre: string,
    public precio: number,
    public vencimiento: number | string,
    public nroCuotas: number,
    public servicios: ({
      creditos: number;
      vencimiento: any;
    } & Servicio)[],
    public descuentosDisponibles: Descuento[] = [],
    public descuento: Descuento,
    public id?
  ) {}
}

export class MembresiaBack {
  constructor(
    public nombre,
    public precio,
    public vencimiento_dias,
    public nro_cuotas,
    public id,
    public descuentos?: DescuentoBack[],
    public servicios?: (ServicioBack & {
      pivot: { creditos: number; vto: number };
    })[]
  ) {}
}

export class MembresiaBuilder {
  empty() {
    return new Membresia(null, null, null, null, [], [], null);
  }
  fromBackEnd(m: MembresiaBack) {
    return new Membresia(
      m.nombre,
      m.precio,
      m.vencimiento_dias,
      m.nro_cuotas,
      m.servicios && m.servicios.map(s => ({
        creditos: s.pivot.creditos,
        vencimiento: s.pivot.vto,
        ...new Servicio(s.nombre, [], s.registra_entrada, s.id)
      })),
      m.descuentos && m.descuentos.map(d => new DescuentoBuilder().fromBackEnd(d)),
      null,
      m.id
    );
  }

  toBackEnd(m: Membresia) {
    return {
      nombre: m.nombre,
      precio: m.precio,
      vencimiento_dias: m.vencimiento,
      nro_cuotas: m.nroCuotas,
      servicios: m.servicios.map(({id, creditos, vencimiento}) => ({
        id,
        cantidadCreditos: creditos,
        vto: vencimiento
      })),
      descuentos: m.descuentosDisponibles.map(({ id }) => id)
    };
  }
}
