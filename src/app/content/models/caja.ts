export class Caja {
    monto: number;
	concepto: string;
	observacion: string;
	tipoDePago: any;
	fecha: any
	id: number

    constructor(monto?, concepto?, observacion?, tipoDePago?, fecha?, id?) {
        this.monto = (monto) ? monto : null;
		this.concepto = (concepto) ? concepto : null;
		this.observacion = (observacion) ? observacion : null;
		this.tipoDePago = (tipoDePago) ? tipoDePago : null;
		this.fecha = fecha || null
		this.id = id || null
    }
}
