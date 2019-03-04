import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Socio, SocioBuilder } from '../../../../models/socio';
import { SociosService } from '../serviceSocio';
import { HttpServiceSocios } from '../../../../services/httpServiceSocios';

@Component({
	selector: 'm-navegacion-socio',
	templateUrl: './navegacion-socio.component.html',
})
export class NavegacionSocioComponent implements OnInit {

	socio: Socio = SocioBuilder.empty()
	idSocio = null

	constructor(private router: Router, private httpSrvSocio: HttpServiceSocios, private socioSrv: SociosService) { }

	ngOnInit() {
		this.socioSrv.getIdSubscription().subscribe(id => {
			this.idSocio = id
			this.socio = this.httpSrvSocio.socios.find(s => s.id === this.socioSrv.idSocio) || this.socio
		})
		this.httpSrvSocio.getSubscription().subscribe(socios => {
			this.socio = socios.find(s => s.id === this.socioSrv.idSocio) || this.socio
		})
	}

	isActive(url): boolean {
		return this.router.url.includes(url);
	}

}
