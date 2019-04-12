import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit
} from "@angular/core";

@Component({
  selector: "m-tabs",
  templateUrl: "./tabs.component.html"
})
export class TabsComponent implements AfterViewInit {
  @Input() tabs: string[] = [];
  @Input() tabSeleccionada: string = null;
  @Output() onTabChange = new EventEmitter();
  @ViewChild("tabElements") tabElements: any;
  constructor() {}

  ngAfterViewInit() {
    console.log(this.tabs);
    this.tabSeleccionada = this.tabSeleccionada || this.tabs[0];
    this.tabSeleccionada && this.esconderElementos();
  }

  esconderElementos() {
    this.tabElements.nativeElement.childNodes.forEach(node => {
      node.hidden = node.id !== this.tabSeleccionada;
    });
  }

  getClase(tab) {
    return tab === this.tabSeleccionada
      ? "nav-link m-tabs__link active show"
      : "nav-link m-tabs__link";
  }

  changeTab(tab) {
    this.onTabChange.emit(tab);
    this.tabSeleccionada = tab;
    this.esconderElementos();
  }
}
