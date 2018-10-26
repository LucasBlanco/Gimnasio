import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Membresia } from "../../../../models/membresia";
import { Servicio } from "../../../../models/servicio";

@Component({
	selector: 'm-tabla-membresia',
	template: `
		<div class="m-portlet m-portlet--success m-portlet--head-solid-bg">
			<div class="m-portlet__head">
				<div class="m-portlet__head-caption">
					<div class="m-portlet__head-title">
        			<span class="m-portlet__head-icon">
          				<i class="flaticon-edit"></i>
        			</span>
						<h3 class="m-portlet__head-text">
							Tabla de membresias
						</h3>
					</div>
				</div>
			</div>
			
			<div class="m-portlet__body">
				<m-tabla [nombreColumnas]="['Nombre', 'Precio', 'Vencimiento']" [valorColumnas]="['nombre', 'precio', 'vencimiento']" [datos]="membresias" [acciones]="acciones"></m-tabla>
			</div>
		</div>`
})
export class TablaMembresiaComponent implements OnInit {
	@Input() membresias: Array<Membresia>;
	@Output('modificar') emitModificacion: EventEmitter<Membresia> = new EventEmitter();
	@Output('baja') emitBaja: EventEmitter<Servicio> = new EventEmitter()
	acciones;
	ngOnInit() {
		this.acciones = [
			{
				callback: this.enviarModificacion.bind(this),
				class: 'la la-edit',
				name: 'Modificar'
			},
			{
				callback: this.enviarBaja.bind(this),
				class: 'la la-trash',
				name: 'Eliminar'
			}
		]
	}

	enviarModificacion(membresia: Membresia) {
		this.emitModificacion.emit(membresia)
	}

	enviarBaja(servicio: Servicio) {
		this.emitBaja.emit(servicio)
	}

}
