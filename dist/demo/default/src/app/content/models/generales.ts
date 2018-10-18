import { Optional } from '@angular/core';

export class Paginador {
    datosMacro: Array<any>;
    datosPaginados: Array<any>;
    totalRegistros: number = 0;
    totalPaginas: number = 0;
    cantReg: number = 10;
    paginas: Array<number> = [];
    paginaActual: number = 1;
    constructor(){
    	this.datosMacro = []
		this.datosPaginados = []
	}
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
        for (var i = 0; i < this.totalPaginas; i++) {
            this.paginas.push(i + 1);
        }
        this.paginarDatos();
    }
    paginarDatos() {
        let x = this.datosMacro;
        let indiceInicial = (this.paginaActual - 1) * this.cantReg;
        let indiceFinal = Math.min(indiceInicial + this.cantReg - 1, this.totalRegistros - 1);
        let itemsPaginados = x.slice(indiceInicial, indiceFinal + 1);
        this.datosPaginados = itemsPaginados;
    }
}

export class Input {
    name: string
    type: string
    value: string
    label: string
    maxlength?: number
    minlength?: number
    constructor(name, type, value, label, minlength?, maxlength?) {
        this.name = name;
        this.type = type;
        this.value = value
        this.label = label
        this.minlength = (minlength == undefined)? null : minlength
        this.maxlength = (maxlength == undefined) ? null : maxlength
    }
}

export class Select {
    name: string
    options: Array<any>
    valueToShow: string
    valueToSave: string
    value: string
    constructor(name, options, value, valueToShow, valueToSave) {
        this.name = name;
        this.options = options;
        this.value = value;
        this.valueToSave = valueToSave;
        this.valueToShow = valueToShow
    }
}

export class ElementoLista {
    label: string
    dato: any
    constructor(label, dato) {
        this.label = label
        this.dato = dato
    }
}


