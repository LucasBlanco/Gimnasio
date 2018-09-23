import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Socio} from "../../../../models/socio";

@Component({
  selector: 'm-navegacion-socio',
  templateUrl: './navegacion-socio.component.html',
})
export class NavegacionSocioComponent implements OnInit, AfterViewInit {

	idSocio: number
	nombreSocio: string
  constructor(private route: ActivatedRoute ) { }

  ngOnInit() {
	  this.route.params.subscribe(params => {
		  let socioEncontrado = +params['id']
	  });
  }

  ngAfterViewInit(){
	  let options = {
		  startStep: 1,
		  manualStepForward: true
	  };
	  let wizard = new mWizard('m_wizard',options);
  }

}
