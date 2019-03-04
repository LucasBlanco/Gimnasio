import { Servicio, ServicioBack } from "./servicio";
import { Descuento, DescuentoBack, DescuentoBuilder } from "./descuento";
import { Socio } from "./socio";

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

  tieneDescuento = () => this.descuento !== null;

  getDescuentoMembresia = () => {
    return this.descuento;
  };
  getDescuentoSocio = (socio: Socio) => {
    const descuento = this.descuentosDisponibles.find(
      d => d.tipo === "socio" && d.id === socio.descuento.id
    );
    return descuento ? descuento : new Descuento(null, null, 0, false, null);
  };

  getPrecioConDescuentos = (socio: Socio) => {
    const descuento = DescuentoBuilder.fusion(
      this.getDescuentoMembresia(),
      this.getDescuentoSocio(socio)
    );
    return descuento.disminuirPrecio(this.precio);
  };
  getPrecioConDescuentosConDetalle = (socio: Socio) => {
    const descuento = DescuentoBuilder.fusion(
      this.getDescuentoMembresia(),
      this.getDescuentoSocio(socio)
    );
    return descuento.disminuirPrecioConDetalle(this.precio);
  };

  getPrecioConAumento = (socio: Socio) => {
    const descuento = DescuentoBuilder.fusion(
      this.getDescuentoMembresia(),
      this.getDescuentoSocio(socio)
    );
    return descuento.aumentarPrecio(this.precio);
  };
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
  static empty() {
    return new Membresia(null, null, null, null, [], [], null);
  }
  static fromBackEnd(m: MembresiaBack) {
    return new Membresia(
      m.nombre,
      m.precio,
      m.vencimiento_dias,
      m.nro_cuotas,
      m.servicios &&
        m.servicios.map(s => ({
          creditos: s.pivot.creditos,
          vencimiento: s.pivot.vto,
          ...new Servicio(s.nombre, [], s.registra_entrada, s.id)
        })),
      m.descuentos && m.descuentos.map(d => DescuentoBuilder.fromBackEnd(d)),
      null,
      m.id
    );
  }

  static toBackEnd(m: Membresia) {
    return {
      nombre: m.nombre,
      precio: m.precio,
      vencimiento_dias: m.vencimiento,
      nro_cuotas: m.nroCuotas,
      servicios: m.servicios.map(({ id, creditos, vencimiento }) => ({
        id,
        cantidadCreditos: creditos,
        vto: vencimiento
      })),
      descuentos: m.descuentosDisponibles.map(({ id }) => id)
    };
  }
}
