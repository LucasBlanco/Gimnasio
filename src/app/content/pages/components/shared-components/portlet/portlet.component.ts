import { Component, OnInit } from "@angular/core";

@Component({
  selector: "m-portlet-container",
  template: `
    <div class="m-portlet m-portlet--success m-portlet--head-solid-bg">
      <ng-content select="m-portlet-header"></ng-content>
      <ng-content select="m-portlet-body"></ng-content>
    </div>
  `
})
export class PortletComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
