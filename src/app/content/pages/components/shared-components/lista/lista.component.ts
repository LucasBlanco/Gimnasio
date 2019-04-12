import { Component, Input, OnChanges, ViewChild } from "@angular/core";
import * as Modelos from "../../../../models/generales";
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: "m-lista",
  templateUrl: "./lista.component.html"
})
export class ListaComponent {
  @Input() lista: Array<Modelos.ElementoLista> = [];
  @Input() titulo: string;
  @ViewChild(ModalComponent) modal;

  show() {
    this.modal.show();
  }

  filtrarNulos() {
    this.lista = this.lista.filter(
      elem => elem.dato != null && elem.dato !== "null"
    );
  }
  isBoolean(element) {
    return typeof element === "boolean";
  }
}
