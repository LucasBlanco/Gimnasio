import {Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import * as Modelos from '../modelos/generales';
import { trigger, style, animate, transition } from '@angular/animations';


declare var mDropdown: any;
declare var $: any;

@Component({
    selector: 'm-tabla',
    templateUrl: './tabla.component.html',
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({ opacity: 0, transform: 'scale(0.5)' }),
                    animate('200ms', style({ opacity: 1, transform: 'scale(1.0)' }))
                ]),
                transition(':leave', [
                    style({ opacity: 1, transform: 'scale(1.0)' }),
                    animate('200ms', style({ opacity: 0, transform: 'scale(0.5)' }))
                ])
            ]
        )
    ],
})
export class TablaComponent implements OnChanges, OnInit{
    @Input() claseTabla: string = 'table table-striped table-hover'; // Clase de la tabla
    @Input() claseHead: string = ''; // Clase del head de la tabla
    @Input() filtered: boolean = true; // Si la tabla contiene filtros
    @Input() datos: Array<any> = [];  // Los datos que se mostraran en la tabla. Ejemplo: [{'name': Lucas, 'lastName': Blanco}]
    @Input() subDatos: string;
    @Input() noRecordMsg: string;
    @Input() nombreColumnas: Array<string> = []; // Los nombres ordenados de cada una de las columnas. Ejemplo: ['Nombre', 'Apellido']
    @Input() subNombreColumnas: Array<string> = [];
    @Input() valorColumnas: Array<string> = []; // Los nombres de las variables de los datos, en el mismo orden que el nombre de la columna correspondiente. Ejemplo: ['name', 'lastName']
    @Input() subValorColumnas: Array<string> = [];
    @Input() acciones: Array<{callback: Function, nombre: string, clase: string}> = []; // El nombre de la accion a realizar un coma y el icono del boton.
    @Input() subAcciones: Array<any> = [];
    @Input() totalesACalcular: Array<string> = [];
    @Input() promediosACalcular: Array<string> = [];
    // El el caso de querer un dropdown se colocara un array dentro del array de acciones, conteniendo las acciones del dropdown.
    // Por ejemplo [['Editar, icono1', 'Eliminar, icono2']] creara un dropdown con dos acciones
    hideSubTabla: Array<boolean> = []
    totales: Array<any> = []
    filtro: any = {}
    p: number = 1;
    dropDownAcciones: Array<any> = []
    subtablaDesplegada: boolean = false;
    Paginador: Modelos.Paginador = new Modelos.Paginador();

    @Output() realizarAccionPadre: EventEmitter<any> = new EventEmitter<any>();

    /*constructor(datos, nombreColumnas, valorColumnas, acciones) {
		this.datos = datos
		this.nombreColumnas = nombreColumnas
		this.valorColumnas = valorColumnas
		this.acciones = acciones
    }*/

    ngOnChanges(changes: SimpleChanges) {
        if (this.datos) {
            if (changes.datos.currentValue.length !== 0) {
                this.Paginador.initPaginador(this.datos);
            } else {
                this.Paginador.datosPaginados = []
            }
            this.totalesACalcular.forEach(total => {
                let indice = this.valorColumnas.indexOf(total)
                this.totales[indice] = this.datos.reduce(function(sum, value) {
                    return sum + value[total];
                }, 0);
            })
            this.promediosACalcular.forEach(prom => {
                let indice = this.valorColumnas.indexOf(prom)
                this.totales[indice] = this.datos.reduce(function(sum, value) {
                    return sum + value[prom];
                }, 0);
                let cantElemsPromedio = this.datos.filter(dato => (dato[prom] != null && dato[prom] !== '')).length
                this.totales[indice] = this.totales[indice] / cantElemsPromedio
            })
            this.totales[0] = 'Total   ( ' + this.datos.length + ' )'
        }
		this.valorColumnas.forEach(valor => {
			this.filtro[valor] = null
			this.totales.push(null)
		});
		if (this.datos !== undefined && this.datos != null) {
			this.datos.forEach(_ => {
				this.hideSubTabla.push(false)
			});
		}

    }

    ngOnInit() {
    	let hola
		hola = 'asdasdasdas'
        /*this.valorColumnas.forEach(valor => {
            this.filtro[valor] = null
            this.totales.push(null)
        });*/
        /*this.acciones.forEach(accion => {
            if (Array.isArray(accion)) {
                this.dropDownAcciones = accion
            }
        });*/

        // this.acciones = this.acciones.filter(accion => !Array.isArray(accion))
        /*this.dropDownAcciones = this.dropDownAcciones.map(accion => ({
            'nombre': accion.split(',')[0],
            'clase': accion.split(',')[1]
        }));*/



    }

    Filtrado(columna, datitos): Array<any> {
        return datitos.filter(item => {
            let notMatchingField = Object.keys(this.filtro[columna].replace('-', ''))
                .find(key => !item[columna].toString().includes(this.filtro[columna].replace('-', '')));
            return !notMatchingField; // true if matches all fields
        });
    }

    Filtrar(columna) {
        let memphis = this;
        setTimeout(function() {
            let datosIniciales = memphis.datos;
            let datosfinales = memphis.Filtrado(columna, memphis.datos);
            memphis.Paginador.initPaginador(datosfinales);
        }, 100);

    }

    ngAfterViewInit() {
        // $("#headerSubTabla").addClass("HeaderTablaBlue")
    }


    enviarAccionAlPadre(dato: any, accion: Function) {
        accion(dato)
    }

    mostrarSubtabla(index: number) {
        this.hideSubTabla.forEach(element => {
            element = false
        });
        this.hideSubTabla[index] = !this.hideSubTabla[index]
    }

    isString(algo) {
        return typeof algo === 'string'
    }

}



