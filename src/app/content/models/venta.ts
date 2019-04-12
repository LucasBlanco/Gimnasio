import { Servicio, ServicioBack } from "./servicio";
import { Descuento, DescuentoBack, DescuentoBuilder } from "./descuento";
import { Socio } from "./socio";
import { Membresia, MembresiaBack, MembresiaBuilder } from "./membresia";
import { Fecha } from "./fecha";

export class Cuota {
  constructor(
    public pago: number,
    public nroCuota: number,
    public pagada: boolean,
    public fechaInicio: Fecha,
    public fechaVto: Fecha,
    public id: number
  ) {}
}

class CuotaBack {
  constructor(
    public pago: number,
    public nro_cuota: number,
    public pagada: number,
    public fecha_inicio: any,
    public fecha_vto: any,
    public id: number
  ) {}
}

export class Venta {
  constructor(
    public membresia: Membresia,
    public cuotas: Cuota[],
    public descuentoMembresia: Descuento,
    public descuentoSocio: Descuento,
    public precio: number,
    public fecha: Fecha,
    public cantidad: number,
    public vto: string,
    public id: number
  ) {}

  tieneCuotasImpagas = () => this.cuotas.some(c => !c.pagada);
  requiereNuevaCompra = () =>
    this.getUltimaCuotaPaga().fechaVto.isBefore(new Fecha());
  getUltimaCuotaPaga = (): Cuota =>
    this.cuotas
      .filter(c => c.pagada)
      .sort((a, b) => (a.fechaVto.isBefore(b.fechaVto) ? -1 : 1))[0];

  getDescuento() {
    return DescuentoBuilder.fusion(
      this.descuentoMembresia,
      this.descuentoSocio
    );
  }
}

export class VentaBack {
  constructor(
    public id: number,
    public fecha: string,
    public vto: string,
    public cantidad: number,
    public membresia: MembresiaBack,
    public cuotas: CuotaBack[],
    public servicios: (ServicioBack & {
      pivot: { creditos: number; vto: number };
    })[],
    public precio: number,
    public descuento_membresia: DescuentoBack,
    public descuento_socio: DescuentoBack
  ) {}
}

export class VentaBuilder {
  static fromBackEnd(v: VentaBack) {
    return new Venta(
      MembresiaBuilder.fromBackEnd({
        ...v.membresia,
        servicios: v.servicios
      }),
      v.cuotas.map(
        c =>
          new Cuota(
            c.pago,
            c.nro_cuota,
            c.pagada === 1,
            new Fecha(c.fecha_inicio),
            new Fecha(c.fecha_vto),
            c.id
          )
      ),
      v.descuento_membresia &&
        DescuentoBuilder.fromBackEnd(v.descuento_membresia),
      v.descuento_socio && DescuentoBuilder.fromBackEnd(v.descuento_socio),
      v.precio,
      new Fecha(v.fecha),
      v.cantidad,
      v.vto,
      v.id
    );
  }
}
