import { AfterViewInit, Component, OnChanges, OnInit, ViewChild, Input } from '@angular/core';
import { Socio } from '../../../../models/socio';
import { HttpServiceSocios } from '../../../../services/httpServiceSocios';
import { SociosService } from '../serviceSocio';
import { HttpServiceMembresia } from '../../../../services/httpServiceMembresia';
import { Membresia } from '../../../../models/membresia';
import { Descuento } from '../../../../models/descuento';
import { ModalSelect } from '../../shared-components/modalSingleElement/modalSelect.component';
import * as Modelos from '../../../../models/generales';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
	selector: 'm-compras',
	templateUrl: './compras.component.html',
})
export class ComprasComponent implements OnInit {

	@Input() socio: Socio = new Socio();
	checkMembresias: { seleccionada: boolean, membresia: Membresia }[] = [];
	tipoDePago: string;
	abonaCon: number = null
	@ViewChild(ModalSelect) modalSelect;

	constructor(private activatedRouter: ActivatedRoute, private httpSrvSocio: HttpServiceSocios, private httpServiceMembresia: HttpServiceMembresia, private srvSocio: SociosService) {

	}


	ngOnInit() {
		this.activatedRouter.params.subscribe((params) => {
			this.srvSocio.changeIdSocio(+params['id'])
			this.httpSrvSocio.getSociosSubscription().subscribe(socios => {
				this.socio = socios.find(s => s.id === this.srvSocio.idSocio)
			})
			this.httpServiceMembresia.getSubscription().subscribe(membresias => {
				this.checkMembresias = membresias.map(m => ({ seleccionada: false, membresia: m }));
			})
		});
	}

	public update() {
		this.checkMembresias.forEach(cm => { cm.seleccionada = false; cm.membresia.descuento = null; });
	}

	comprar() {
		this.httpSrvSocio.comprar(this.socio.id, this.tipoDePago, this.checkMembresias.filter(mem => mem.seleccionada).map(mem => mem.membresia));
	}


	agregarDescuento(membresia: Membresia) {

		this.modalSelect.select = new Modelos.Select('Descuento', membresia.descuentosDisponibles.filter(d => d.tipo === 'membresia'), null, 'nombre', 'id');
		this.modalSelect.callbackFunction = (id) => {
			membresia.descuento = membresia.descuentosDisponibles.find(desc => desc.id === Number(id));
		};
		this.modalSelect.show();
	}

	calcularTotal() {
		return this.checkMembresias.filter(mem => mem.seleccionada)
			.reduce((a, b) => a + this.calcularTotalParcial(b.membresia), 0);
	}

	membresiasSeleccionadas() {
		return this.checkMembresias.filter(m => m.seleccionada).map(m => m.membresia);
	}

	descuentoSocio(membresia) {
		if (!membresia) {
			return null;
		}
		const descuento: Descuento = membresia.descuentosDisponibles.find(d => d.tipo === 'socio' && d.id === this.socio.descuento.id);
		let precio = 0;
		if (!descuento) {
			return null;
		}
		if (!membresia.descuento) {
			precio = membresia.precio * descuento.porcentaje / 100;
			return { descuento: descuento, precio: precio };
		}
		if (descuento.aplicableEnConjunto || membresia.descuento.aplicableEnConjunto) {
			 const precioConDescuentoMembresia = membresia.precio - (membresia.precio * membresia.descuento.porcentaje / 100);
			precio = precioConDescuentoMembresia * descuento.porcentaje / 100;
		} else {
			precio = membresia.precio * descuento.porcentaje / 100;
		}
		return {descuento: descuento, precio: precio};
	}

	descuentoMembresia(membresia) {
		return (membresia.descuento) ? membresia.precio * membresia.descuento.porcentaje / 100 : 0;
	}

	calcularTotalParcial(membresia) {
		const descuentoMembresia = this.descuentoMembresia(membresia);
		const descuentoSocio = (this.descuentoSocio(membresia)) ? this.descuentoSocio(membresia).precio : 0;
		return membresia.precio - descuentoMembresia - descuentoSocio;
	}
}
