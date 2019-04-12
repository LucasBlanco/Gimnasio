import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "m-portlet-header",
  template: `
    <div class="m-portlet__head">
      <div class="m-portlet__head-caption">
        <div class="m-portlet__head-title">
          <ng-container *ngIf="icon && title">
            <span class="m-portlet__head-icon">
              <i style="font-size: 2.2rem;" [class]="icon"></i>
            </span>
            <h3 class="m-portlet__head-text">
              {{ title }}
            </h3>
          </ng-container>
          <ng-container *ngIf="!icon && !title">
            <ng-content></ng-content>
          </ng-container>
        </div>
      </div>
    </div>
  `
})
export class PortletHeaderComponent implements OnInit {
  @Input() icon: string = null;
  @Input() title: string = null;

  constructor() {}

  ngOnInit() {}
}
