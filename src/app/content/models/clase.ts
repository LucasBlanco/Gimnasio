import { Profesor, ProfesorBack, ProfesorBuilder } from "./profesor";
import { Servicio, ServicioBack, ServicioBuilder } from "./servicio";
import { Socio, SocioBack, SocioBuilder } from "./socio";
import { Fecha } from "./fecha";

export class Clase {
  constructor(
    public horaInicio: string,
    public horaFin: string,
    public entradaDesde: string,
    public entradaHasta: string,
    public profesores: Profesor[],
    public servicio: Servicio,
    public alumnos: Socio[],
    public fecha: Fecha,
    public estado: number = 1,
    public id?: number
  ) {}
}

class ClaseBack {
  constructor(
    public desde,
    public hasta,
    public entradaDesde,
    public entradaHasta,
    public profesores: ProfesorBack[],
    public servicio: ServicioBack,
    public alumnos: SocioBack[],
    public fecha: string,
    public estado: number = 1,
    public id?: number
  ) {}
}

export class ClaseBuilder {
  static empty() {
    return new Clase(null, null, null, null, [], null, [], new Fecha());
  }

  static fromBackEnd(
    c: ClaseBack & { entrada_desde: string; entrada_hasta: string }
  ) {
    return new Clase(
      c.desde,
      c.hasta,
      c.entrada_desde,
      c.entrada_hasta,
      c.profesores.map(p => ProfesorBuilder.fromBackEnd(p)),
      ServicioBuilder.fromBackEnd(c.servicio),
      c.alumnos.map(a => SocioBuilder.fromBackEnd(a)),
      new Fecha(c.fecha),
      null,
      c.id
    );
  }
  static toBackEnd(c: Clase) {
    const clase = new ClaseBack(
      c.horaInicio,
      c.horaFin,
      c.entradaDesde,
      c.entradaHasta,
      [],
      null,
      [],
      c.fecha.back
    );
    const { alumnos, profesores, servicio, ...resto } = clase;
    return {
      ...resto,
      profesores: c.profesores.map(p => p.id),
      idServicio: c.servicio.id
    };
  }
}
