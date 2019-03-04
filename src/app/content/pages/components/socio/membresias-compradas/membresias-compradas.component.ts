import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Membresia, MembresiaBuilder } from "../../../../models/membresia";
import { HttpServiceSocios } from "../../../../services/httpServiceSocios";
import { Servicio } from "../../../../models/servicio";
import * as moment from "moment";
import {
  useAnimation,
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

import * as animaciones from "../../animaciones";
import { Venta, Cuota } from "../../../../models/venta";
import { SocioBuilder } from "../../../../models/socio";

@Component({
  selector: "m-membresias-compradas",
  templateUrl: "./membresias-compradas.component.html",
  animations: [
    trigger("slowExitUp", [
      transition(":leave", [useAnimation(animaciones.exitUp)])
    ])
  ]
})
export class MembresiasCompradasComponent implements OnInit {
  constructor(
    private activatedRouter: ActivatedRoute,
    private socioSrv: HttpServiceSocios
  ) {}
  idSocio: number;
  socio = SocioBuilder.empty();
  ventas: Venta[] = [];
  membresiaSeleccionada: Membresia & { cuotas: Cuota[] };

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      this.idSocio = +params["id"];
    });
    this.socioSrv.getSubscription().subscribe(socios => {
      this.socio = socios.find(socio => socio.id === this.idSocio);
      this.ventas = this.socio.ventas || [];
      this.ventas.forEach(venta => {
        venta.membresia.descuento = venta.descuentoMembresia;
        venta.membresia.precio = venta.precio;
        venta.membresia.precio = venta.membresia.getPrecioConAumento(
          this.socio
        );
        venta.membresia.vencimiento = venta.vto;
        venta.membresia.nroCuotas = venta.cuotas.length;
        (venta.membresia as any).cuotas = venta.cuotas;
      });
    });
  }

  agregarMembresia = membresia => {
    this.membresiaSeleccionada = membresia;
  };

  eliminarMembresia = membresia => {
    this.membresiaSeleccionada = null;
  };

  cancelarSubscripciones() {
    const venta = this.ventas.find(
      v => v.membresia.id === this.membresiaSeleccionada.id
    );
    this.socioSrv.eliminarVenta(venta.id, this.idSocio);

    this.membresiaSeleccionada = null;
  }

  membresiaEstaSeleccionada = venta => {
    return this.membresiaSeleccionada === venta.membresia;
  };

  cancelarCuotas() {
    const venta = this.ventas.find(
      v => v.membresia.id === this.membresiaSeleccionada.id
    );
    const ultimaCuota = this.membresiaSeleccionada.cuotas.pop();
    if (ultimaCuota.pagada) {
      this.socioSrv.cancelarCuota(venta.id, ultimaCuota.id, this.idSocio);
    }
  }
}
