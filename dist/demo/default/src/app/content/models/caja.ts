export class Caja {
	tipo: string
    monto: number
	concepto: string
	observacion: string
	tipoDePago: any

    constructor(monto?, concepto?, observacion?, tipoDePago?, tipo?) {
		this.tipo = tipo
        this.monto = (monto)? monto : null
		this.concepto = (concepto)? concepto : null
		this.observacion = (observacion)? observacion : null
		this.tipoDePago = (tipoDePago)? tipoDePago : null
    }
    
}
