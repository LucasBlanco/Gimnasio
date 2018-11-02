import { Injectable } from '@angular/core';
import {HttpServiceSocios} from '../../../services/httpServiceSocios';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {Socio} from '../../../models/socio';
import { Compra } from '../../../models/compra'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SociosService {

	public idSocio: Number = 0
	subjectId = new BehaviorSubject<Number>(0);
	

	constructor(private httpSrvSocio: HttpServiceSocios, private router: Router) {
	}

	public getIdSubscription(): Observable<any> {
		return this.subjectId.asObservable();
	}

	private updateIdObservers() {
		this.subjectId.next(this.idSocio);
	}

	public changeIdSocio = (id: Number) => {this.idSocio = id; this.updateIdObservers()}

	public findUser = (id) => {
		this.idSocio = id
		this.router.navigate(['socio/compras', id]);
	}

}
