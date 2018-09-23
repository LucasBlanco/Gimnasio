import { Component, OnInit } from '@angular/core';
import {Socio} from "../../../../models/socio";

@Component({
  selector: 'm-perfil',
  templateUrl: './perfil.component.html',
})
export class PerfilComponent implements OnInit {

	socioEncontrado: Socio = new Socio()

  constructor() { }

  ngOnInit() {
  }

}
