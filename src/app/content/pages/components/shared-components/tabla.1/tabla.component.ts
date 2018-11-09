import {Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges, AfterViewInit} from '@angular/core';
import * as Modelos from './paginador';
import { trigger, state, style, animate, transition } from '@angular/animations';


declare var mDropdown: any;
declare var mUtil: any;

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
export class TablaComponent implements  OnChanges, OnInit, AfterViewInit {
    @Input() claseTabla: string = 'table table-striped'; // Clase de la tabla
    @Input() claseHead: string = ''; // Clase del head de la tabla
    @Input() filtered: boolean = true // Si la tabla contiene filtros
    @Input() datos: Array<any>; // Los datos que se mostraran en la tabla. Ejemplo: [{'name': Lucas, 'lastName': Blanco}]
    @Input() estilos = {}
    @Input() subDatos: string;
    @Input() noRecordMsg: string;
    @Input() nombreColumnas: Array<string>; // Los nombres ordenados de cada una de las columnas. Ejemplo: ['Nombre', 'Apellido']
    @Input() subNombreColumnas: Array<string>;
    @Input() valorColumnas: Array<string>; // Los nombres de las variables de los datos, en el mismo orden que el nombre de la columna correspondiente. Ejemplo: ['name', 'lastName']
    @Input() subValorColumnas: Array<string>;
    @Input() acciones: Array<{callback: Function, class: string, name: string}> = []; // El nombre de la accion a realizar un coma y el icono del boton.
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

    constructor() {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.datos) {
            if (changes.datos.currentValue.length !== 0) {
                this.Paginador.initPaginador(this.datos);
            } else {
                this.Paginador.datosPaginados = []
            }
            this.totalesACalcular.forEach(total => {
                const indice = this.valorColumnas.indexOf(total)
                this.totales[indice] = this.datos.reduce(function(sum, value) {
                    return sum + value[total];
                }, 0);
            })
            this.promediosACalcular.forEach(prom => {
                const indice = this.valorColumnas.indexOf(prom)
                this.totales[indice] = this.datos.reduce(function(sum, value) {
                    return sum + value[prom];
                }, 0);
                const cantElemsPromedio = this.datos.filter(dato => (dato[prom] != null && dato[prom] !== '')).length
                this.totales[indice] = this.totales[indice] / cantElemsPromedio
            })
            this.totales[0] = 'Total   ( ' + this.datos.length + ' )'
        }

    }

    ngOnInit() {
        this.valorColumnas.forEach(valor => {
            this.filtro[valor] = ''
            this.totales.push(null)
        });
        /*this.acciones.forEach(accion => {
            if (Array.isArray(accion)) {
                this.dropDownAcciones = accion
            }
        });*/

        /*this.acciones = this.acciones.filter(accion => !Array.isArray(accion))
        this.dropDownAcciones = this.dropDownAcciones.map(accion => ({
            'nombre': accion.split(',')[0],
            'clase': accion.split(',')[1]
        }));
        this.acciones = this.acciones.map(accion => ({
            'nombre': accion.split(',')[0],
            'clase': accion.split(',')[1]
        }));*/

        if (this.datos !== undefined && this.datos != null) {
            this.datos.forEach(_ => {
                this.hideSubTabla.push(false)
            });
        }

    }

    Filtrado(datitos): Array<any> {
        return datitos.filter(item => {
            return Object.entries(this.filtro).every( filtro => {
                return String(item[filtro[0]]).includes(String(filtro[1]).replace(/-/g, ''))
            })
        });
    }

    Filtrar(columna) {
        const memphis = this;
        setTimeout(function() {
            const datosIniciales = memphis.datos;
            const datosfinales = memphis.Filtrado(memphis.datos);
            memphis.Paginador.initPaginador(datosfinales);
        }, 100);

    }

    ngAfterViewInit() {
        /*this._script.loadScripts('body',
            ['assets/app/js/util.js']);
        this._script.loadScripts('body',
            ['assets/app/js/dropdown.js']);

        var dropdown1 = new mDropdown('dropdownMenuButton', {
            toggle: 'click',
            hoverTimeout: 300,
            skin: 'light',
            height: 'auto',
            maxHeight: false,
            minHeight: false,
            persistent: false,
            mobileOverlay: true
        });

        $('#headerSubTabla').addClass("HeaderTablaBlue")*/
    }


    enviarAccionAlPadre(dato: any, accion: string) {
        /*var data = {
            'nombre': accion,
            'data': dato
        }
        this.realizarAccionPadre.emit(data)*/
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



