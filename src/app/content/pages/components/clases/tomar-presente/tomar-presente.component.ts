import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'm-tomar-presente',
  templateUrl: './tomar-presente.component.html'
})
export class TomarPresenteComponent implements OnInit {
  clases = [];
  nombres = ['hola', 'chau', 'holis'];
  constructor() {}

  ngOnInit() {}

  getNombreClases() {
    this.clases.map(({ servicio }) => servicio.nombre);
  }

  tabChange(tab) {
    console.log(tab);
  }
}
