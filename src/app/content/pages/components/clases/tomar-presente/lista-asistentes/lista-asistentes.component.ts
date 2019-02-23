import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'm-lista-asistentes',
  templateUrl: './lista-asistentes.component.html'
})
export class ListaAsistentesComponent implements OnInit {
  @Input() asistentes = [];
  constructor() {}

  ngOnInit() {}
}
