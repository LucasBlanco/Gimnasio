import {AfterViewInit, Component, OnInit} from '@angular/core';
import { PagoSocio } from 'models/pago-socio'
import {Socio} from "../../../models/socio";
import {
	trigger,
	style,
	animate,
	transition, keyframes
} from '@angular/animations';
import {HttpServiceSocios} from "../../../services/htppServiceSocios";
import * as select2 from 'select2'
import {ActivatedRoute} from "@angular/router";
declare var $: any

@Component({
  selector: 'm-pago-socios',
  templateUrl: './pago-socios.component.html',
	animations: [
		trigger('expandContract', [

			transition('* => in', [
				animate(600, keyframes([
					style({transform: 'scale(1)'}),
					style({transform: 'scale(1.05)'}),
					style({transform: 'scale(1)'}),
					style({transform: 'scale(1.05)'}),
					style({transform: 'scale(1)'}),
				]))
			])
		])
	]
})
export class PagoSociosComponent implements OnInit, AfterViewInit {

	socios: Array<Socio>
	clases: Array<{nombre: string, id: number}>
	socioABuscar: {nombre: string, apellido: string, dni: number} = {nombre: null, apellido: null, dni: null}
	socioEncontrado: Socio = new Socio()
	dummySocio: Socio = new Socio()
	change: string = ''

  constructor(private service: HttpServiceSocios, private route: ActivatedRoute ) {

  }

  ngOnInit(){
	  this.socios = [new Socio('Carlos', 'Garcia', 'cgarcia@email.com', '2018-05-15', 123, '1123996532', 'Calle inventada 123')]
	  this.clases= [{nombre: 'Zumba', id: 1}, {nombre: 'Calistenia', id: 2}]
	  this.route.params.subscribe(params => {
		  let socioEncontrado = this.socios.find(socio => socio.dni === +params['id'])
		  if(socioEncontrado){ this.socioEncontrado = socioEncontrado }
	  });
	}

	ngAfterViewInit(){
	}
  buscarSocio(){
		let socioEncontrado = this.socios.find(socio => socio.nombre === this.socioABuscar.nombre || socio.apellido === this.socioABuscar.apellido || socio.dni === this.socioABuscar.dni)
	  	this.socioEncontrado = (socioEncontrado)? socioEncontrado : this.dummySocio
	  	this.change = 'in'
	}

	borrar(){
		this.socioABuscar = {nombre: null, apellido:null, dni: null}
		this.socioEncontrado = new Socio()
	}

	cobrarSocio(){
		this.service.postCobrarSocio(this.socioEncontrado)
		console.log('Cobrar', this.socioEncontrado.dni)
	}
}
