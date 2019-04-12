import { Component, OnInit, Input, OnChanges } from "@angular/core";
declare var $: any;

@Component({
  selector: "m-modal",
  templateUrl: "./modal.component.html"
})
export class ModalComponent {
  @Input() titulo: string;

  show() {
    $("#modalId").modal("show");
  }
  hide() {
    $("#modalId").modal("hide");
  }
}
