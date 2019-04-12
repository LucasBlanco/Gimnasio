import { Component, OnInit } from "@angular/core";
import { HttpServiceSocios } from "../../../../services/httpServiceSocios";
import { SociosService } from "../serviceSocio";
import moment from "moment";
import { ActivatedRoute, Params } from "@angular/router";
import { Fecha } from "../../../../models/fecha";

@Component({
  selector: "m-historial-compras",
  templateUrl: "./historial-compras.component.html",
  styleUrls: ["./historial-compras.component.scss"]
})
export class HistorialComprasComponent implements OnInit {
  historialTabla;
  acciones;
  constructor(
    private activatedRouter: ActivatedRoute,
    private httpSrvSocio: HttpServiceSocios,
    private socioSrv: SociosService
  ) {}

  generarHistorial({
    socio,
    descuento_socio,
    descuento_membresia,
    membresia,
    fecha,
    cuotas,
    ...resto
  }) {
    return cuotas
      .filter(c => c.pagada === 1)
      .map(c => ({
        nroCuota: c.nro_cuota,
        precio: c.pago,
        socio: socio.nombre,
        descuentoMembresia: descuento_membresia && descuento_membresia.nombre,
        descuentoSocio: descuento_socio && descuento_socio.nombre,
        membresia: membresia.nombre,
        fecha: new Fecha(fecha).front
      }));
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe((params: Params) => {
      this.socioSrv.changeIdSocio(+params["id"]);
      this.httpSrvSocio.subjectSocios.subscribe(socios => {
        this.httpSrvSocio.traerHistorial(+params["id"]).then(response => {
          this.historialTabla = response.flatMap(h => this.generarHistorial(h));
        });
      });
    });
  }
}
