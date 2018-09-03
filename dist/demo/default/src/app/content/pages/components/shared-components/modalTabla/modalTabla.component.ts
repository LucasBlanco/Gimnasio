
import { Component, Input } from '@angular/core';
import * as Modelos from '../modelos/generales';

@Component({
    selector: 'modalTabla',
    templateUrl: "./modalTabla.component.html",
})

export class ModalTablaComponent {
    @Input() datos: Array<any> = [];
    @Input() nombreColumnas: Array<string> = [];
    @Input() valorColumnas: Array<string> = [];
    @Input() titulo: string;
}
