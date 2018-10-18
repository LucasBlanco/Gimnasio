import {
	Component,
	OnInit,
	HostBinding,
	ElementRef,
	AfterViewInit,
	ChangeDetectionStrategy
} from '@angular/core';
import { QuickSidebarOffcanvasDirective } from '../../../../core/directives/quick-sidebar-offcanvas.directive';

@Component({
	selector: 'm-quick-sidebar',
	templateUrl: './quick-sidebar.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickSidebarComponent implements OnInit, AfterViewInit {
	@HostBinding('id') id = 'm_quick_sidebar';
	@HostBinding('class')
	classes = 'm-quick-sidebar m-quick-sidebar--tabbed m-quick-sidebar--skin-light';
	@HostBinding('attr.mQuickSidebarOffcanvas')
	mQuickSidebarOffcanvas: QuickSidebarOffcanvasDirective;

	@HostBinding('style.overflow') styleOverflow: any = 'hidden';

	constructor() {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {

	}
}
