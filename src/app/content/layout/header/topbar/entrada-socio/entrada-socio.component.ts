import { Component, OnInit } from '@angular/core';
import {HttpServiceEntrada} from '../../../../services/httpServiceEntrada';

@Component({
  selector: 'm-entrada-socio',
  templateUrl: './entrada-socio.component.html'
})
export class EntradaSocioComponent implements OnInit {

  constructor( private entradaSrv: HttpServiceEntrada) { }

  ngOnInit() {
  }

  acceder(idSocio: string) {
      this.entradaSrv.acceder(true, Number(idSocio));
  }

}
