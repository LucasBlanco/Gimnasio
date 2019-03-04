import { Descuento, DescuentoBuilder, DescuentoBack } from "./descuento";
import { Venta, VentaBack, VentaBuilder } from "./venta";
import { IBuilder } from "./builder";

export class Socio {
  constructor(
    public nombre: string,
    public apellido: string,
    public descuento: Descuento,
    public fechaNacimiento: any,
    public dni: number,
    public telefono: string,
    public direccion: string,
    public genero: "masculino" | "femenino" | "otro",
    public email: string,
    public nroSocio: string | number,
    public imagen: string,
    public id?: number,
    public ventas?: Venta[]
  ) {}
}

export class SocioBack {
  constructor(
    public nombre: string,
    public apellido: string,
    public descuento: DescuentoBack,
    public fecha_nacimiento: any,
    public dni: number,
    public celular: string,
    public domicilio: string,
    public genero: "masculino" | "femenino" | "otro",
    public email: string,
    public nro_socio: string | number,
    public id?: number,
    public ventas?: VentaBack[]
  ) {}
}

export class SocioBuilder {
  static empty() {
    return new Socio(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
  }
  static fromBackEnd(sb: SocioBack) {
    return new Socio(
      sb.nombre,
      sb.apellido,
      sb.descuento && DescuentoBuilder.fromBackEnd(sb.descuento),
      sb.fecha_nacimiento,
      sb.dni,
      sb.celular,
      sb.domicilio,
      sb.genero,
      sb.email,
      sb.nro_socio,
      `foto/socio/${sb.id}`,
      sb.id,
      sb.ventas.map(venta => VentaBuilder.fromBackEnd(venta))
    );
  }
  static toBackEnd(sf: Socio) {
    const socio = new SocioBack(
      sf.nombre,
      sf.apellido,
      null,
      sf.fechaNacimiento,
      sf.dni,
      sf.telefono,
      sf.direccion,
      sf.genero,
      sf.email,
      sf.nroSocio
    );

    const { descuento, ...resto } = socio;
    return { ...resto, id_descuento: sf.descuento && sf.descuento.id };
  }
}
