import { HorarioServicio } from "./horarioServicio";
import { ProfesorBack } from "./profesor";

export class Servicio {
  constructor(
    public nombre: string,
    public dias: Array<{ dia: string; horarios: HorarioServicio[] }>,
    public registraEntrada: boolean,
    public id?: number
  ) {}
}

class HorarioBack {
  constructor(
    dia: number,
    desde: string,
    hasta: string,
    entrada_desde: string,
    entrada_hasta: string,
    profesores: ProfesorBack[]
  ) {}
}

export class ServicioBack {
  constructor(
    public nombre: string,
    public registra_entrada: boolean,
    public horarios: HorarioBack[],
    public id?: number
  ) {}
}

export class ServicioBuilder {
  private getID = dia =>
    [
      "lunes",
      "martes",
      "miercoles",
      "jueves",
      "viernes",
      "sabado",
      "domingo"
    ].findIndex(_dia => _dia === dia) + 1;

  private getDia = id =>
    [
      "lunes",
      "martes",
      "miercoles",
      "jueves",
      "viernes",
      "sabado",
      "domingo"
    ].find((_dia, i) => i + 1 === id);

  empty() {
    return new Servicio(null, [], false);
  }
  toBackEnd(s: Servicio) {
    const { nombre, registraEntrada, dias } = s;
    const dias2 = dias.map(({ dia, horarios }) => ({
      id: this.getID(dia),
      horarios: horarios.map(
        ({
          horaInicio,
          horaFin,
          entradaDesde,
          entradaHasta,
          profesores,
          tipoPago,
          importe
        }) => ({
          desde: horaInicio,
          hasta: horaFin,
          entrada_desde: entradaDesde,
          entrada_hasta: entradaHasta,
          profesores: profesores.map(({ id }) => id)
        })
      )
    }));
    return { nombre, registra_entrada: registraEntrada, dias: dias2 };
  }

  fromBackEnd(s: ServicioBack) {
    const agruparPorDia = horarios => {
      const dias = Array.from(new Set(horarios.map(h => h.dia)));
      const agrupados = dias.map(dia => ({
        dia: dia,
        horarios: horarios.filter(hs => hs.dia === dia)
      }));
      return agrupados;
    };
    return new Servicio(
      s.nombre,
      agruparPorDia(s.horarios).map(h => ({
        dia: this.getDia(h.dia),
        horarios: h.horarios.map(
          hs =>
            new HorarioServicio(
              hs.desde,
              hs.hasta,
              hs.entrada_desde,
              hs.entrada_hasta,
              hs.profesores.map(p => p),
              null,
              null
            )
        )
      })),
      s.registra_entrada,
      s.id
    );
  }
}
