import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[subtabla]',
})
export class SubtablaDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}