import { Component, OnInit, OnDestroy} from '@angular/core';
import { Profesor } from '../../../../models/profesor';
import { HttpServiceSocios } from '../../../../services/httpServiceSocios';
import { HttpServiceEntrada } from '../../../../services/httpServiceEntrada';

@Component({
  selector: 'm-entrada-socio',
  templateUrl: './entrada-socio.component.html'
})
export class EntradaSocioComponent implements OnInit, OnDestroy {

  constructor( private socioSrv: HttpServiceSocios, private entradaSrv: HttpServiceEntrada) { }

  datos: Array<any> = [];
  filtro: string = 'nombre';
  search: string = '';
  datosBuscables: Array<string> = [];
  subscription;
  socioSeleccionado: Profesor;

  ngOnInit(): void {
    this.subscription = this.socioSrv.getSubscription().subscribe( 
      socios => {
        this.datos = socios.map(({ nombre, apellido, ...socio }) => ({
          nombre: `${apellido}, ${nombre} (${socio.id})`, ...socio
        }));
        this.datosBuscables = this.generarArray();
      }
    )

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
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
