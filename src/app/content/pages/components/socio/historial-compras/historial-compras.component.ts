import { Component, OnInit } from "@angular/core";
import { HttpServiceSocios } from "../../../../services/httpServiceSocios";
import { SociosService } from "../serviceSocio";
import moment from "moment";
import { ActivatedRoute, Params } from "@angular/router";

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

  ngOnInit() {
    this.activatedRouter.params.subscribe((params: Params) => {
      this.socioSrv.changeIdSocio(+params["id"]);
      this.httpSrvSocio.subjectSocios.subscribe(socios => {
        this.httpSrvSocio.traerHistorial(+params["id"]).then(response => {
          this.historialTabla = response.map(
            ({
              socio,
              descuento_socio,
              descuento_membresia,
              membresia,
              fecha,
              ...resto
            }) => {
              return {
                socio: socio.nombre,
                descuentoSocio: descuento_socio && descuento_socio.nombre,
                descuentoMembresia:
                  descuento_membresia && descuento_membresia.nombre,
                membresia: membresia.nombre,
                fecha: moment(fecha).format("DD/MM/YYYY  hh:mm"),
                ...resto
              };
            }
          );
        });
      });
    });
  }
}
