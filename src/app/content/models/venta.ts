import { Servicio, ServicioBack } from "./servicio";
import { Descuento, DescuentoBack, DescuentoBuilder } from "./descuento";
import { Socio } from "./socio";
import { Membresia, MembresiaBack, MembresiaBuilder } from "./membresia";

export class Cuota {
  constructor(
    public pago: number,
    public nroCuota: number,
    public pagada: boolean,
    public fechaInicio: any,
    public fechaVto: any,
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
    public fecha: string,
    public cantidad: number,
    public vto: string,
    public id: number
  ) {}
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
  fromBackEnd(v: VentaBack) {
    return new Venta(
      new MembresiaBuilder().fromBackEnd({
        ...v.membresia,
        servicios: v.servicios
      }),
      v.cuotas.map(
        c =>
          new Cuota(
            c.pago,
            c.nro_cuota,
            c.pagada === 1,
            c.fecha_inicio,
            c.fecha_vto,
            c.id
          )
      ),
      v.descuento_membresia &&
        new DescuentoBuilder().fromBackEnd(v.descuento_membresia),
      v.descuento_socio &&
        new DescuentoBuilder().fromBackEnd(v.descuento_socio),
      v.precio,
      v.fecha,
      v.cantidad,
      v.vto,
      v.id
    );
  }
}
