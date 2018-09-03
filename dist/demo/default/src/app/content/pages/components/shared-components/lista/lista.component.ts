
import { Component, Input } from '@angular/core';
import * as Modelos from '../modelos/generales';

@Component({
    selector: 'm-lista',
    templateUrl: './lista.component.html',
})

export class ListaComponent {
    @Input() lista: Array<Modelos.ElementoLista> = [new Modelos.ElementoLista(null, null)]
    titulo: string = 'Detalles'
    filtrarNulos() {
        this.lista = this.lista.filter(elem => elem.dato != null && elem.dato !== 'null')
    }
    isBoolean(element) {
        return typeof (element) === 'boolean'
    }
}
