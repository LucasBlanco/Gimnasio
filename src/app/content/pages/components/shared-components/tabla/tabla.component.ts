import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges, AfterViewInit, HostListener, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4'
import 'datatables.net-responsive-dt'
import 'datatables.net-buttons-dt'

@Component({
    selector: 'm-tabla',
    templateUrl: './tabla.component.html',
})
export class TablaComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {



    @Input() filtered: boolean = true // Si la tabla contiene filtros
    @Input() datos: Array<any> = []; // Los datos que se mostraran en la tabla. Ejemplo: [{'name': Lucas, 'lastName': Blanco}]
    @Input() estilos = {}
    @Input() nombreColumnas: Array<any>; // Los nombres ordenados de cada una de las columnas. Ejemplo: ['Nombre', 'Apellido']
    @Input() valorColumnas: Array<string>; // Los nombres de las variables de los datos, en el mismo orden que el nombre de la columna correspondiente. Ejemplo: ['name', 'lastName']
    @Input() acciones: Array<{ callback: Function, class: string, name: string }> = []; // El nombre de la accion a realizar un coma y el icono del boton.
    @Input() totalesACalcular: Array<string> = [];
    @Input() promediosACalcular: Array<string> = [];
    columnas
    totales: Array<any> = []
    tabla
    options = {
        columnDefs: [],
        responsive: !0,
        language: {
            'sProcessing': 'Procesando...',
            'sLengthMenu': 'Mostrar _MENU_ registros',
            'sZeroRecords': 'No se encontraron resultados',
            'sEmptyTable': 'Ningún dato disponible en esta tabla',
            'sInfo': 'Mostrando del _START_ al _END_ de  _TOTAL_ ',
            'sInfoEmpty': '',
            'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
            'sInfoPostFix': '',
            'sSearch': 'Buscar:',
            'sUrl': '',
            'sInfoThousands': ',',
            'sLoadingRecords': 'Cargando...',
            'oPaginate': {
                'sFirst': '<<',
                'sLast': '>>',
                'sNext': '>',
                'sPrevious': '<'
            },
            'oAria': {
                'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
                'sSortDescending': ': Activar para ordenar la columna de manera descendente'
            }
        }
    }

    constructor(private chRef: ChangeDetectorRef) {

    }

    ngOnChanges(changes: SimpleChanges) {
        let priority = 0
        this.iniciarOptions()
        this.nombreColumnas.forEach((n, i) => {
            if (n.includes('*')) {
                this.options.columnDefs.push({ responsivePriority: ++priority, targets: i })
            }
            if (!n.includes('/')) {
                this.options.columnDefs.push({ searchable: false, targets: i })
            }
        })
        this.columnas = this.nombreColumnas.map(n => n.replace('*', '').replace('/', ''))


        if (($.fn as any).DataTable.isDataTable('#m_table_1')) {
            this.tabla.destroy();
        }
        if (this.hayAcciones()) {
            this.options.columnDefs.push({ responsivePriority: 0, targets: -1 })
        }
        console.log('tablaOptions', this.options)
        this.chRef.detectChanges();


        this.tabla = ($('#m_table_1') as any).DataTable(this.options)
    }

    ngOnInit() {
        this.iniciarOptions()
    }
    ngOnDestroy(): void {
        this.tabla.destroy()

    }


    ngAfterViewInit() {
    }

    hayAcciones = () => this.acciones.length > 0

    iniciarOptions = () => {
        this.options = {
            columnDefs: [],
            responsive: !0,
            language: {
                'sProcessing': 'Procesando...',
                'sLengthMenu': 'Mostrar _MENU_ registros',
                'sZeroRecords': 'No se encontraron resultados',
                'sEmptyTable': 'Ningún dato disponible en esta tabla',
                'sInfo': 'Mostrando del _START_ al _END_ de  _TOTAL_ ',
                'sInfoEmpty': '',
                'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
                'sInfoPostFix': '',
                'sSearch': 'Buscar:',
                'sUrl': '',
                'sInfoThousands': ',',
                'sLoadingRecords': 'Cargando...',
                'oPaginate': {
                    'sFirst': '<<',
                    'sLast': '>>',
                    'sNext': '>',
                    'sPrevious': '<'
                },
                'oAria': {
                    'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
                    'sSortDescending': ': Activar para ordenar la columna de manera descendente'
                }
            }
        }
    }
}



