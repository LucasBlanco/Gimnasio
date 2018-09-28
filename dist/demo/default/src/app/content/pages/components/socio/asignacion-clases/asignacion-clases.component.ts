import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Socio} from "../../../../models/socio";
import {
	trigger,
	style,
	animate,
	transition, keyframes
} from '@angular/animations';
import {HttpServiceSocios} from "../../../../services/htppServiceSocios";
import {ActivatedRoute} from "@angular/router";
declare var $: any
@Component({
  selector: 'm-pago-socios',
  templateUrl: './asignacion-clases.component.html',
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
export class AsignacionClasesComponent implements OnInit, AfterViewInit {

	socios: Array<Socio>
	clases: Array<{nombre: string, id: number}>
	venta: {clases: Array<{nombre: string, cantDias: number}>, promocion: string} = {clases: [], promocion: null}
	socioEncontrado: Socio = new Socio()
	cantidadDeClases: Array<any>= [null]
	change: string = ''

  constructor(private service: HttpServiceSocios, private route: ActivatedRoute ) {

  }

  ngOnInit(){
	  this.socios = [new Socio('Carlos', 'Garcia', 'cgarcia@email.com', '2018-05-15', 123, '1123996532', 'Calle inventada 123')]
	  this.clases= [{nombre: 'Zumba', id: 1}, {nombre: 'Calistenia', id: 2}]
	  this.route.params.subscribe(params => {
		  let socioEncontrado = this.socios.find(socio => socio.dni === +params['id'])
		  this.socioEncontrado = (socioEncontrado)? socioEncontrado : new Socio('...','...','...','...','...','...','...')
	  });


	}

	ngAfterViewInit(){

	}

	cobrarSocio(){
		console.log('Cobrar', this.socioEncontrado.dni)
	}
}
