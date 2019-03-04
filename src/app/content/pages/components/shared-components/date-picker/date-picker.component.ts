import {
  Component,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
  Input
} from "@angular/core";

@Component({
  selector: "m-date-picker",
  template: `
    <ng-datepicker [(ngModel)]="date"></ng-datepicker>
  `
})
export class DatePickerComponent implements AfterViewInit {
  @Input() inputModel;
  @Output() inputModelChange = new EventEmitter();

  constructor() {}

  ngAfterViewInit() {}
}
