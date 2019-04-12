import { Component, OnInit } from "@angular/core";

@Component({
  selector: "m-portlet-body",
  template: `
    <div class="m-portlet__body"><ng-content></ng-content></div>
  `
})
export class PortletBodyComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
