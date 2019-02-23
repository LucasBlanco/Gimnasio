import { Profesor, ProfesorBack, ProfesorBuilder } from "./profesor";
import { Servicio, ServicioBack, ServicioBuilder } from "./servicio";
import { Socio, SocioBack, SocioBuilder } from "./socio";

export class Clase {
  constructor(
    public horaInicio: string,
    public horaFin: string,
    public entradaDesde: string,
    public entradaHasta: string,
    public profesores: Profesor[],
    public servicio: Servicio,
    public alumnos: Socio[],
    public fecha: string,
    public estado: number = 1,
    public id?: number
  ) {}
}

class ClaseBack {
  constructor(
    public desde,
    public hasta,
    public entrada_desde,
    public entrada_hasta,
    public profesores: ProfesorBack[],
    public servicio: ServicioBack,
    public alumnos: SocioBack[],
    public fecha: string,
    public id?: number
  ) {}
}

export class ClaseBuilder {
  empty() {
    return new Clase(null, null, null, null, [], null, [], null);
  }

  fromBackEnd(c: ClaseBack) {
    return new Clase(
      c.desde,
      c.hasta,
      c.entrada_desde,
      c.entrada_hasta,
      c.profesores.map(p => new ProfesorBuilder().fromBackEnd(p)),
      new ServicioBuilder().fromBackEnd(c.servicio),
      c.alumnos.map(a => new SocioBuilder().fromBackEnd(a)),
      c.fecha,
      null,
      c.id
    );
  }
  toBackEnd(c: Clase) {
    const clase = new ClaseBack(
      c.horaInicio,
      c.horaFin,
      c.entradaDesde,
      c.entradaHasta,
      [],
      null,
      [],
      c.fecha
    );
    const { alumnos, profesores, servicio, ...resto } = clase;
    return {
      ...resto,
      profesores: c.profesores.map(p => p.id),
      id_servicio: c.servicio.id
    };
  }
}
