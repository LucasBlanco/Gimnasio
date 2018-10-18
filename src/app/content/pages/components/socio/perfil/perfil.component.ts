import { Component, OnInit } from '@angular/core';
import {Socio} from "../../../../models/socio";
import {SociosService} from "../serviceSocio";
import * as moment from 'moment'
@Component({
  selector: 'm-perfil',
  templateUrl: './perfil.component.html',
})
export class PerfilComponent implements OnInit {

	socio: Socio

  constructor( private socioSrv: SociosService) { }

  ngOnInit() {
		this.socio = this.socioSrv.getSocio()
  }

}
