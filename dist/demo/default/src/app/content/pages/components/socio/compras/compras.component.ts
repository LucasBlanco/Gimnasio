import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Socio} from "../../../../models/socio";
import {HttpServiceSocios} from "../../../../services/httpServiceSocios";
import {ActivatedRoute} from "@angular/router";
import {SociosService} from "../serviceSocio";
import {HttpServiceMembresia} from "../../../../services/httpServiceMembresia";
import {Membresia} from "../../../../models/membresia";

declare var $: any
@Component({
  selector: 'm-compras',
  templateUrl: './compras.component.html',
})
export class ComprasComponent implements OnInit {

	socio
	membresias: {seleccionada: boolean,  membresia: Membresia}[] = []
	tipoDePago: string

  constructor(private httpSrvSocio: HttpServiceSocios, private httpServiceMembresia: HttpServiceMembresia, private srvSocio: SociosService) {

  }

  ngOnInit(){
		this.socio = this.srvSocio.getSocio()
	  this.httpServiceMembresia.traerTodos().then( membresias => {
	  	this.membresias = membresias.map( m => ({seleccionada: false, membresia: m}))
	  })
	}

	comprar(){
		this.httpSrvSocio.comprar(this.socio.id, this.tipoDePago, [])
	}

	borrar(){}
	getServicios(membresia: Membresia) {
		// membresia.servicios.reduce((acum, srv) => acum +','+ srv.servicio.nombre, '')
	}
}
