import { Component, OnInit } from '@angular/core';
import { Caja } from 'models/caja'
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'm-caja',
  template: `
	  <div class="row">
		  <div class="col-lg-12" *ngIf="verIngresos">
			  <m-ingresos [tipo]="tipo" (egreso)="egreso($event)" (ingreso)="ingreso($event)"></m-ingresos>
		  </div>
		  <div class="col-lg-12" *ngIf="verMovimientos">
			  <m-tabla-movimientos [movimientos]="movimientos"></m-tabla-movimientos>
		  </div>
	  </div>
	  
  		
  `
})
export class CajaComponent implements OnInit {

	tipo: string
	verIngresos: Boolean = false
	verMovimientos: Boolean = false
	movimientos: Array<Caja> = [new Caja()]

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
	  this.router.params.subscribe((params: Params) =>{
		  this.verIngresos = (params['view'] === 'ingresos')
		  this.verMovimientos = (params['view'] === 'movimientos')
	  })
  }

  ingreso(caja: Caja){

  }

  egreso(caja: Caja){

  }
}
