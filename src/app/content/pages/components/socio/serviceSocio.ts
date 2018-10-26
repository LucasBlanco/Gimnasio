import { Injectable } from '@angular/core';
import {HttpServiceSocios} from '../../../services/httpServiceSocios';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {Socio} from '../../../models/socio';

@Injectable({
	providedIn: 'root',
})
export class SociosService {

	private subscribers = [];
	public socio: Socio = new Socio();
	

	constructor(private httpSrvSocio: HttpServiceSocios, private router: Router) {
	}

	 public subscribe(subscriber) {
		 this.subscribers = this.subscribers.filter(s => s !== subscriber).concat([subscriber]);
		 console.log(this.subscribers);
	}

	public getSocio =  () => this.socio;

	public findUser = (id) => {
		this.httpSrvSocio.traerUno(null, id || 1).then( socio => {
			this.socio = socio;
			this.socio.fechaNacimiento = moment(this.socio.fechaNacimiento).format('DD/MM/YYYY');
			this.subscribers.forEach( sub => sub.update());
			this.router.navigate(['socio/compras']);
		});
	}

}
