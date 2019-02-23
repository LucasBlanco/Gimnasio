import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'm-popover',
  templateUrl: './popover.component.html'
})
export class PopoverComponent implements OnInit, AfterViewInit {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
  random: number;

  constructor() {}

  ngOnInit() {
    this.random = new Date().getTime();
  }
  ngAfterViewInit() {
    $('#popover' + this.random).popover({
      trigger: 'hover',
      title: this.title,
      placement: this.placement,
      content: this.content,
      html: true
    });
  }
  onMouseIn() {
    $('#popover' + this.random).popover('show');
  }
  onMouseOut() {
    $('#popover' + this.random).popover('hide');
  }
}
