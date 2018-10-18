import {AfterViewInit, Component, OnChanges, OnInit, ViewChild, Input} from '@angular/core';
import {Socio} from "../../../../models/socio";
import {HttpServiceSocios} from "../../../../services/httpServiceSocios";
import {SociosService} from "../serviceSocio";
import {HttpServiceMembresia} from "../../../../services/httpServiceMembresia";
import {Membresia} from "../../../../models/membresia";
import {Descuento} from "../../../../models/descuento";
import {ModalSelect} from "../../shared-components/modalSingleElement/modalSelect.component";
import * as Modelos from "../../../../models/generales"
declare var $: any
@Component({
  selector: 'm-compras',
  templateUrl: './compras.component.html',
})
export class ComprasComponent implements OnInit{

	@Input() socio: Socio = new Socio()
	checkMembresias: {seleccionada: boolean, membresia: Membresia}[] = []
	tipoDePago: string
	@ViewChild(ModalSelect) modalSelect;

  constructor(private httpSrvSocio: HttpServiceSocios, private httpServiceMembresia: HttpServiceMembresia, private srvSocio: SociosService) {

  }


  ngOnInit(){
  		this.srvSocio.subscribe(this)
		this.socio = this.srvSocio.getSocio()
	  this.httpServiceMembresia.traerTodosCompleto().then( membresias => {
	  	this.checkMembresias = membresias.map(m => ({seleccionada: false, membresia: m}))
	  })
	}

	public update(){
		this.socio = this.srvSocio.getSocio()
		this.checkMembresias.forEach(cm => {cm.seleccionada = false; cm.membresia.descuento = null})
	}

	comprar(){
		this.httpSrvSocio.comprar(this.socio.id, this.tipoDePago, this.checkMembresias.filter(mem => mem.seleccionada).map(mem => mem.membresia))
	}


	agregarDescuento(membresia: Membresia) {

		 this.modalSelect.select = new Modelos.Select('Descuento', membresia.descuentosDisponibles, null, 'nombre', 'id')
		this.modalSelect.callbackFunction = (id) => {
		 	membresia.descuento = membresia.descuentosDisponibles.find(desc => desc.id === Number(id))
		 }
		this.modalSelect.show()
	}

	calcularTotal() {
		return this.checkMembresias.filter(mem =>mem.seleccionada)
			.map(mem => (mem.membresia.precio * ((mem.membresia.descuento)? (mem.membresia.descuento.porcentaje/100) : 1)))
			.reduce( (a,b) => a+b, 0)
	}

	membresiasSeleccionadas() {
		return this.checkMembresias.filter(m => m.seleccionada).map(m => m.membresia)
	}
}
