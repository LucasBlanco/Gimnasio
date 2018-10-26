import { Component, OnInit, AfterViewInit } from '@angular/core';
import {HttpServiceEntrada} from '../../../../services/httpServiceEntrada';
import { HttpParams } from '@angular/common/http';
import { Socio } from '../../../../models/socio';

@Component({
  selector: 'm-entrada-socio',
  templateUrl: './entrada-socio.component.html'
})
export class EntradaSocioComponent implements OnInit {

  constructor( private entradaSrv: HttpServiceEntrada) { }

  datos: Array<any> = [];
  filtro: string = 'nombre';
  search: string = '';
  datosBuscables: Array<string> = [];
  subscription;
  socioSeleccionado: Socio;

  ngOnInit(): void {



  }

  buscarSocios() {
    this.datos = this.entradaSrv.socios.map(({ nombre, apellido, ...socio }) => ({
      nombre: `${apellido}, ${nombre} (${socio.id})`, ...socio}));
    this.datosBuscables = this.generarArray();
  }


  generarArray() {
    const algo = this.datos.map(dato => dato[this.filtro]);
    return algo;
  }

  handleResultSelected(result) {
    this.search = result;
    const objectToReturn = this.datos.filter(dato => Object.entries(dato).some(([key, value]) => key === this.filtro && value === result));
    this.acceder(objectToReturn[0].id);
  }


  acceder(idSocio: string) {
      this.entradaSrv.acceder(Number(idSocio));
  }

}
