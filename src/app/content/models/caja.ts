export class Caja {
    monto: number;
	concepto: string;
	observacion: string;
	tipoDePago: any;
	fecha: any

    constructor(monto?, concepto?, observacion?, tipoDePago?, fecha?) {
        this.monto = (monto) ? monto : null;
		this.concepto = (concepto) ? concepto : null;
		this.observacion = (observacion) ? observacion : null;
		this.tipoDePago = (tipoDePago) ? tipoDePago : null;
		this.fecha = fecha || null
    }
}
