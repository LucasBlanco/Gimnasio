import { Component, OnInit } from '@angular/core';
import { Socio, SocioBuilder } from '../../../../models/socio';
import { SociosService } from '../serviceSocio';
import * as moment from 'moment'
import { HttpServiceSocios } from '../../../../services/httpServiceSocios';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'm-perfil',
  templateUrl: './perfil.component.html',
})
export class PerfilComponent implements OnInit {

  socio: Socio = new SocioBuilder().empty()

  constructor(private activatedRouter: ActivatedRoute, private socioSrv: SociosService, private httpSrvSocio: HttpServiceSocios) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe((params) => {
      this.socioSrv.changeIdSocio(+params['id'])
      this.httpSrvSocio.subjectSocios.subscribe(socios => {
        this.socio = socios.find(s => s.id === this.socioSrv.idSocio)
      })
    });
  }

}
