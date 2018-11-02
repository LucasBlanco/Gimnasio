import { ActivatedRoute, Params } from "@angular/router";

export class ABM {
    editando: boolean
    mostrarAlta: boolean
    alta: Function
    traerUno: Function
    editar: Function
    borrar: Function
    datoSeleccionado

    constructor(public activatedRouter: ActivatedRoute) {
        this.activatedRouter.params.subscribe((params: Params) => {
            this.mostrarAlta = (params['view'] === 'am');
            this.editando = false;
        });
    }

    realizarAlta(dato) {
        this.alta(dato);
    }

    cargarDatosModificacion(dato) {
        this.traerUno(dato).then(_dato => {
            this.datoSeleccionado = _dato;
            this.editando = true;
            this.mostrarAlta = true;
        });
    }

    realizarModificacion(dato) {
        this.editar(dato).then(() => {
            this.mostrarAlta = false;
        });
    }
}
