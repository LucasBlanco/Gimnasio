import { ActivatedRoute, Params } from "@angular/router";
import { OnDestroy, OnInit } from "@angular/core";
import { HttpServiceMembresia } from "../../../services/httpServiceMembresia";

export abstract class ABM implements OnDestroy, OnInit {
    public editando: boolean
    public mostrarAlta: boolean
    alta: Function
    traerUno: Function
    editar: Function
    borrar: Function
    datoSeleccionado
    subscription
    datos
    dataService

    constructor(public activatedRouter: ActivatedRoute, public srv) {
        this.activatedRouter.params.subscribe((params: Params) => {
            this.mostrarAlta = (params['view'] === 'am');
            this.editando = false;
        });
        
    }
    ngOnInit() {
        this.subscription = this.dataService.getSubscription().subscribe(datos => {
            this.datos = datos;
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

    realizarBaja(dato) {
        this.borrar(dato)
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }
}
