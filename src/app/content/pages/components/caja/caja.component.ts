import { Component, OnInit, OnDestroy } from "@angular/core";
import { Caja, CajaBuilder } from "../../../models/caja";
import { ActivatedRoute, Params } from "@angular/router";
import { HttpServiceCaja } from "../../../services/httpServiceCaja";

@Component({
  selector: "m-caja",
  template: `
    <div class="row">
      <div class="col-lg-12" *ngIf="verIngresos">
        <m-ingresos
          [tipo]="tipo"
          (egreso)="egreso($event)"
          (ingreso)="ingreso($event)"
        ></m-ingresos>
      </div>
      <div class="col-lg-12" *ngIf="verMovimientos">
        <m-tabla-movimientos [movimientos]="movimientos"></m-tabla-movimientos>
      </div>
    </div>
  `
})
export class CajaComponent implements OnInit, OnDestroy {
  tipo: string;
  verIngresos: Boolean = false;
  verMovimientos: Boolean = false;
  movimientos: Array<Caja> = [new CajaBuilder().empty()];
  subscription;

  constructor(
    private router: ActivatedRoute,
    private cajaSrv: HttpServiceCaja
  ) {}

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.verIngresos = params["view"] === "ingresos";
      this.verMovimientos = params["view"] === "movimientos";
    });
    this.subscription = this.cajaSrv.getSubscription().subscribe(datos => {
      this.movimientos = datos;
    });
  }

  ingreso(caja: Caja) {
    this.cajaSrv.ingreso(caja).then(() => this.movimientos.push(caja));
  }

  egreso(caja: Caja) {
    this.cajaSrv.egreso(caja).then(() => this.movimientos.push(caja));
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}
