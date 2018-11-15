
export class HorarioServicio {
    horaInicio: any
    horaFin: any
    entradaDesde: any
    entradaHasta: any
    profesor: string
    tipoPago: 'hora' | 'fijo' | 'clase'
    importe: number

    constructor(horaInicio?, horaFin?, entradaDesde?, entradaHasta?, profesor?, tipoPago?, importe? ) {
        this.horaInicio = horaInicio || null
        this.horaFin = horaFin || null
        this.entradaDesde = entradaDesde || null
        this.entradaHasta = entradaHasta || null
        this.profesor = profesor || null
        this.tipoPago = tipoPago || null
        this.importe = importe || null
    }
}
