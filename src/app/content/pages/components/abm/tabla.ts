import { EventEmitter, Input, Output } from '@angular/core';

export abstract class Tabla {

    @Input() datos: Array<any>;
    @Output('modificar') emitModificacion: EventEmitter<any> = new EventEmitter();
    @Output('baja') emitBaja: EventEmitter<any> = new EventEmitter()

    enviarModificacion(dato) {
        this.emitModificacion.emit(dato)
    }

    enviarBaja(dato) {
        this.emitBaja.emit(dato)
    }
}
