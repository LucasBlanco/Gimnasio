import { Injectable } from '@angular/core';
import {HttpServiceSocios} from "../../../services/httpServiceSocios";
import {Router} from "@angular/router";
import * as moment from 'moment'

@Injectable({
	providedIn: 'root',
})
export class SociosService {

	public socio
	constructor(private httpSrvSocio: HttpServiceSocios, private router: Router) {

	}

	public getSocio =  () => this.socio

	public findUser = (id) => {
		this.httpSrvSocio.traerUno(null, id).then( socio => {
			this.socio = socio
			this.socio.fechaNacimiento = moment(this.socio.fechaNacimiento).format('DD/MM/YYYY')
			this.router.navigate(['socio/compras']);
		})
	}

}
