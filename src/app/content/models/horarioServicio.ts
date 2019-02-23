import { Profesor } from "./profesor";

export class HorarioServicio {
    horaInicio: any
    horaFin: any
    entradaDesde: any
    entradaHasta: any
    profesores: Profesor[]
    tipoPago: 'hora' | 'fijo' | 'clase'
    importe: number

    constructor(horaInicio?, horaFin?, entradaDesde?, entradaHasta?, profesores?, tipoPago?, importe? ) {
        this.horaInicio = horaInicio || null
        this.horaFin = horaFin || null
        this.entradaDesde = entradaDesde || null
        this.entradaHasta = entradaHasta || null
        this.profesores = profesores || null
        this.tipoPago = tipoPago || null
        this.importe = importe || null
    }
}
