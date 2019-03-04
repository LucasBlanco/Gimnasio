import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  ViewChild,
  Input
} from "@angular/core";
import { Socio, SocioBuilder } from "../../../../models/socio";
import { HttpServiceSocios } from "../../../../services/httpServiceSocios";
import { SociosService } from "../serviceSocio";
import { HttpServiceMembresia } from "../../../../services/httpServiceMembresia";
import { Membresia, MembresiaBuilder } from "../../../../models/membresia";
import { Descuento, DescuentoBuilder } from "../../../../models/descuento";
import { ModalSelect } from "../../shared-components/modalSingleElement/modalSelect.component";
import * as Modelos from "../../../../models/generales";
import { ActivatedRoute } from "@angular/router";
import { t } from "@angular/core/src/render3";
import { Cuota } from "../../../../models/venta";
declare var $: any;
@Component({
  selector: "m-compras",
  templateUrl: "./compras.component.html"
})
export class ComprasComponent implements OnInit {
  @Input() socio: Socio = SocioBuilder.empty();

  membresias: (Membresia & { cuotas: Cuota[] })[] = []; // cuotas por si es una membresia en cuotas y se debe pagar una cuota N
  membresiasSelec: (Membresia & { cuotas: Cuota[] })[] = [];
  tipoDePago: string;
  observacion: string;
  abonaCon: number = null;
  @ViewChild(ModalSelect) modalSelect;

  constructor(
    private activatedRouter: ActivatedRoute,
    private httpSrvSocio: HttpServiceSocios,
    private httpServiceMembresia: HttpServiceMembresia,
    private srvSocio: SociosService
  ) {}

  ngOnInit() {
    this.iniciar();
  }

  iniciar() {
    this.activatedRouter.params.subscribe(params => {
      this.socio = SocioBuilder.empty();
      this.membresias = [];
      this.membresiasSelec = [];
      this.srvSocio.changeIdSocio(+params["id"]);
      this.httpSrvSocio.getSubscription().subscribe(socios => {
        const descuento = DescuentoBuilder.empty();

        (this.membresias as any) = this.httpServiceMembresia.datos; // reinicio las referencias a las membresias originales para tenerlas como estaban de base
        this.socio =
          socios.find(s => s.id === this.srvSocio.idSocio) ||
          SocioBuilder.empty();
        this.seleccionarMembresias();
      });
      this.httpServiceMembresia.getSubscription().subscribe(membresias => {
        this.membresias = membresias.map(m => ({ ...m })); // Para cambiar la referencia a la membresia y no modificarla
        this.seleccionarMembresias();
      });
    });
  }
  public update() {
    this.membresias.forEach(cm => {
      cm.descuento = null;
    });
  }

  seleccionarMembresias() {
    if (this.socio.id !== undefined && this.membresias.length > 0) {
      const ventas = this.socio.ventas;
      if (ventas) {
        this.membresiasSelec = this.membresias.filter(m =>
          ventas.some(v => m.id === v.membresia.id)
        );
        this.membresiasSelec.forEach(m => {
          const venta = ventas
            .filter(v => v.membresia.id === m.id)
            .sort((a, b) => b.id - a.id)[0]; // ordeno de mayor a menor por id y me quedo con la primera, para encontrar la ultima venta en el caso que haya repetidas
          const { descuentoSocio, descuentoMembresia, precio } = venta;
          m.descuento = descuentoMembresia;
          if (venta.tieneCuotasImpagas()) {
            if (m.nroCuotas > 1) {
              m.cuotas = venta.cuotas;
              m.precio = venta.getDescuento().aumentarPrecio(precio);
            }
          }
        });
      }
    }
  }

  comprar() {
    this.httpSrvSocio.comprar(
      this.socio.id,
      this.tipoDePago,
      this.observacion,
      this.membresiasSelec
    );
  }

  agregarDescuento(membresia: Membresia) {
    console.log(this.membresias);
  }

  calcularTotal() {
    return this.membresiasSelec.reduce(
      (a, b) => a + this.calcularTotalParcial(b),
      0
    );
  }

  getDescuentoSocio(membresia) {
    return membresia.getDescuentoSocio(this.socio);
  }

  getRebajaDescuentoSocio(membresia: Membresia) {
    return membresia.getPrecioConDescuentosConDetalle(this.socio).rebajaSocio;
  }
  getRebajaDescuentoMembresia(membresia: Membresia) {
    return membresia.getPrecioConDescuentosConDetalle(this.socio)
      .rebajaMembresia;
  }
  calcularTotalParcial(membresia) {
    return membresia.getPrecioConDescuentos(this.socio);
  }

  tipoDescuento(membresia: Membresia) {
    const descMemb = "Descuento de membresia";
    const descCuotas = "Descuento por cuotas";
    if (membresia.descuento && membresia.nroCuotas > 2) {
      return `${descMemb}<br /> ${descCuotas}`;
    } else {
      return membresia.descuento ? descMemb : descCuotas;
    }
  }

  agregarMembresia = membresia => {
    this.membresiasSelec = [...this.membresiasSelec, membresia];
    console.log(this.membresiasSelec);
  };

  eliminarMembresia = (membresia: Membresia) => {
    this.membresiasSelec = this.membresiasSelec.filter(m => m !== membresia);
    console.log(this.membresiasSelec);
  };

  estaSeleccionada(membresia: Membresia) {
    return this.membresiasSelec.some(m => m.id === membresia.id);
  }
}
