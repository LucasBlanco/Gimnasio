import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Caja} from "../../../../models/caja";

@Component({
  selector: 'm-ingresos',
  templateUrl: './ingresos.component.html',
})
export class IngresosComponent implements OnInit {

	@Input() tipo: string;
	@Output('ingreso') emitIngreso: EventEmitter<Caja> = new EventEmitter();
	@Output('egreso') emitEgreso: EventEmitter<Caja> = new EventEmitter();
	caja: Caja = new Caja()

  constructor() { }

  ngOnInit() {
  }

  enviarEvento(){
		if(this.tipo === 'ingreso'){ this.emitIngreso.emit(this.caja) }
	  	if(this.tipo === 'egreso'){ this.emitEgreso.emit(this.caja) }
  }

}
