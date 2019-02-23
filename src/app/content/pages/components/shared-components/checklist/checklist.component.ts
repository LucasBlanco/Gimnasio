import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "m-checklist",
  templateUrl: "./checklist.component.html",
  styleUrls: ["./checklist.component.scss"]
})
export class ChecklistComponent implements OnInit {
  @Input() items: Array<any> = [];
  @Input() itemsSeleccionados: Array<any> = [];
  @Input() label: string = null;
  @Output() onChange = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.items = this.items.map(item => ({
      ...item,
      seleccionado: this.itemEstaSeleccionado(item)
    }));
  }

  toggleItem(item) {
    const itemAModificar = this.items.find(i => i === item);
    itemAModificar.seleccionado = !itemAModificar.seleccionado;
    const items = this.items
      .filter(i => i.seleccionado)
      .map(i => this.sacarSeleccionado(i));
    this.onChange.emit(items);
  }

  itemEstaSeleccionado(item) {
    return this.itemsSeleccionados.some(i => i.id === item.id);
  }

  sacarSeleccionado = ({ seleccionado, ...i }) => ({ ...i });
}
