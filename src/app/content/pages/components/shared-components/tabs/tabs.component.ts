import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'm-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent implements OnInit {
  @Input() tabs: string[] = [];
  @Input() tabSeleccionada: string;
  @Output() onTabChange = new EventEmitter();
  constructor() {}

  ngOnInit() {
    this.tabSeleccionada = this.tabSeleccionada || this.tabs[0];
  }

  getClase(tab) {
    return tab === this.tabSeleccionada
      ? 'nav-link m-tabs__link active show'
      : 'nav-link m-tabs__link';
  }

  changeTab(tab) {
    this.onTabChange.emit(tab);
  }
}
