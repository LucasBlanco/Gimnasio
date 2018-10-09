import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Socio} from "../../../../models/socio";
import {SociosService} from "../serviceSocio";

@Component({
  selector: 'm-navegacion-socio',
  templateUrl: './navegacion-socio.component.html',
})
export class NavegacionSocioComponent implements OnInit {

	socio: Socio = new Socio()

  constructor(private route: ActivatedRoute, private srvSocio: SociosService) { }

  ngOnInit() {
		this.socio =  this.srvSocio.socio
  }


}
