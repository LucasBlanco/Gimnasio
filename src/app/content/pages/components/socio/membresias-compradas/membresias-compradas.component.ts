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
  socio = new SocioBuilder().empty();
  ventas: Venta[] = [];
  membresiasSeleccionadas: (Membresia & { cuotas: Cuota[] })[] = [];

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      this.idSocio = +params["id"];
    });
    this.socioSrv.getSubscription().subscribe(socios => {
      this.socio = socios.find(socio => socio.id === this.idSocio);
      this.ventas = this.socio.ventas || [];
      this.ventas.forEach(venta => {
        venta.membresia.descuento = venta.descuentoMembresia;
        const porcMembresia = venta.descuentoMembresia
          ? venta.descuentoMembresia.porcentaje
          : 0;
        const porcSocio = venta.descuentoSocio
          ? venta.descuentoSocio.porcentaje
          : 0;
        venta.membresia.precio =
          porcMembresia === 0 && porcSocio === 0
            ? venta.membresia.precio
            : venta.precio / ((porcMembresia + porcSocio) / 100);
        venta.membresia.vencimiento = venta.vto;
        venta.membresia.nroCuotas = venta.cuotas.length;
        (venta.membresia as any).cuotas = venta.cuotas;
      });
    });
  }

  agregarMembresia = membresia => {
    this.membresiasSeleccionadas = [...this.membresiasSeleccionadas, membresia];
  };

  eliminarMembresia = membresia => {
    this.membresiasSeleccionadas = this.membresiasSeleccionadas.filter(
      m => m === membresia
    );
  };

  cancelarSubscripciones() {
    this.membresiasSeleccionadas.forEach(m => {
      const venta = this.ventas.find(v => v.membresia.id === m.id);
      this.socioSrv.eliminarVenta(venta.id, this.idSocio);
    });

    this.membresiasSeleccionadas = [];
  }

  membresiaSeleccionada = venta => {
    this.membresiasSeleccionadas.some(m => m === venta.membresia);
  };

  cancelarCuotas() {
    this.membresiasSeleccionadas.forEach(m => {
      const venta = this.ventas.find(v => v.membresia.id === m.id);
      const ultimaCuota = m.cuotas.pop();
      if (ultimaCuota.pagada) {
        this.socioSrv.cancelarCuota(venta.id, ultimaCuota.id, this.idSocio);
      }
    });
  }
}
