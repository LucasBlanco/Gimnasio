import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Caja, CajaBuilder } from "../../../../models/caja";

@Component({
  selector: "m-ingresos",
  templateUrl: "./ingresos.component.html"
})
export class IngresosComponent implements OnInit {
  @Input() tipo: string;
  @Output("ingreso") emitIngreso = new EventEmitter();
  @Output("egreso") emitEgreso = new EventEmitter();

  caja: Caja = new CajaBuilder().empty();

  constructor() {}

  ngOnInit() {}

  borrar() {
    this.caja = new CajaBuilder().empty();
  }

  enviarEvento() {
    console.log("TIPO", this.tipo);
    if (this.tipo === "ingreso") {
      this.emitIngreso.emit(this.caja);
    }
    if (this.tipo === "egreso") {
      this.emitEgreso.emit(this.caja);
    }
    this.borrar();
  }
}
