export class Paginador {
	datosMacro: Array<any>;
	datosPaginados: Array<any>;
	totalRegistros: number = 0;
	totalPaginas: number = 0;
	primeraPagina: number = 0
	ultimaPagina: number = 5
	cantReg: number = 10;
	paginas: Array<number> = [];
	paginaActual: number = 1;
	setPage(x) {
		this.paginaActual = x;
		this.paginarDatos();
	}
	initPaginador(x) {
		this.datosMacro = x;
		this.paginas = [];
		this.totalRegistros = x.length;
		this.totalPaginas = Math.ceil(this.totalRegistros / this.cantReg);
		for (var i = 0; i < this.totalPaginas; i++) {
			this.paginas.push(i + 1);
		}
		this.paginarDatos();
		return this.paginas;
	}
	refreshPaginador() {
		this.totalPaginas = Math.ceil(this.totalRegistros / this.cantReg);
		this.paginas = [];
		this.paginaActual = 1
		for (var i = 0; i < this.totalPaginas; i++) {
			this.paginas.push(i + 1);
		}
		this.paginarDatos();
	}
	paginarDatos() {
		let x = this.datosMacro;
		let indiceInicial = (this.paginaActual - 1) * this.cantReg;
		let indiceFinal = Math.min(indiceInicial + Number(this.cantReg) - 1, this.totalRegistros - 1);
		let itemsPaginados = x.slice(indiceInicial, indiceFinal + 1);
		this.datosPaginados = itemsPaginados;
	}

	avanzarPaginas(){
		let ultimaPagina = Math.min(this.paginaActual + 5, this.totalPaginas)
		this.primeraPagina = Math.max(ultimaPagina - 5, 0);
		this.ultimaPagina = ultimaPagina
	}

	retrocederPaginas(){
		this.primeraPagina = Math.max(this.primeraPagina - 5, 0);
		this.ultimaPagina = Math.max(this.ultimaPagina - 5, 5)
	}

}
