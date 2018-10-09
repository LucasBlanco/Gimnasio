import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Membresia} from "../../../../models/membresia";
import {Servicio} from "../../../../models/servicio";
import {Descuento} from "../../../../models/descuento";
import {HttpServiceServicio} from "../../../../services/httpServiceServicio";
import {HttpServiceDescuento} from "../../../../services/httpServiceDescuento";

@Component({
  selector: 'm-am-membresia',
  templateUrl: './am-membresia.component.html',
})
export class AmMembresiaComponent implements OnChanges, OnInit {

	@Input() membresiaAModificar: Membresia = new Membresia();
	@Input() editando: boolean = false;
	@Output('alta') altaEmitter = new EventEmitter<Membresia>();
	@Output('modificar') modificacionEmitter = new EventEmitter<Membresia>();
	@Output('mostrarTabla') irALaTablaEmitter = new EventEmitter<void>();
	membresia: Membresia = new Membresia();
	servicios: Array<{seleccionado: boolean, creditos: number, vencimiento: number, servicio: Servicio}> = []
	descuentos: Array<{descuento: Descuento, seleccionado: boolean}> = []

  constructor(private servicioSrv: HttpServiceServicio, private descuentoSrv: HttpServiceDescuento) { }

  ngOnInit(){
  		this.servicioSrv.traerTodos().then(servicios => {
  			this.servicios = servicios.map( x => ({seleccionado: false, creditos: null, vencimiento: null, servicio: x}))
			if(this.editando){
				this.membresiaAModificar.servicios.forEach( srv => {
				let servicio = this.servicios.find( s => s.servicio.id === srv.servicio.id)
				servicio.seleccionado = true
				servicio.vencimiento = srv.vencimiento
				servicio.creditos = srv.creditos
			})}
  		})
		this.descuentoSrv.traerTodos().then(descuentos => {
			this.descuentos = descuentos.map( x => ({seleccionado: false, descuento: x}))
			if(this.editando){this.descuentos.forEach( desc => {
				desc.seleccionado = this.membresiaAModificar.descuentos.some( d => d.id === desc.descuento.id)
			}
			)}
		})
	}

	ngOnChanges( changes: SimpleChanges) {
		this.membresia = (this.editando)? this.membresiaAModificar : new Membresia()
	}

	borrar() {
		this.membresia = new Membresia();
		this.servicios.forEach( s => {s.seleccionado = false; s.creditos = null; s.vencimiento = null});
		this.descuentos.forEach( d => d.seleccionado = false)
	}

	irALaTabla(){
		this.irALaTablaEmitter.emit()
	}

	enviarEvento() {
		this.membresia.servicios = this.servicios.filter(x => x.seleccionado).map( ({seleccionado, ...x}) => x)
		this.membresia.descuentos = this.descuentos.filter(x => x.seleccionado).map( x => x.descuento)
		if(!this.editando){
			this.altaEmitter.emit(this.membresia)
		}else{
			this.modificacionEmitter.emit(this.membresia)
		}
		this.borrar()
	}
}
