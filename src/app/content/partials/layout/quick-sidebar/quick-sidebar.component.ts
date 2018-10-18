import {
	Component,
	OnInit,
	HostBinding,
	ElementRef,
	AfterViewInit,
	ChangeDetectionStrategy
} from '@angular/core';
import { QuickSidebarOffcanvasDirective } from '../../../../core/directives/quick-sidebar-offcanvas.directive';
import {HttpServiceEntrada} from '../../../services/httpServiceEntrada';
import {Servicio} from '../../../models/servicio';

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
    subscription
    servicios: Servicio[]

	@HostBinding('style.overflow') styleOverflow: any = 'hidden';

	constructor(private el: ElementRef, private entradaSrv: HttpServiceEntrada) {}

	ngOnInit(): void {
        this.subscription = this.entradaSrv.accesoSocio.subscribe(
            servicios => {this.servicios = servicios; console.log('servicios', servicios)}
        );
    }

	ngAfterViewInit(): void {
		Promise.resolve(null).then(() => {
			this.mQuickSidebarOffcanvas = new QuickSidebarOffcanvasDirective(this.el);
			// manually call the directives' lifecycle hook method
			this.mQuickSidebarOffcanvas.ngAfterViewInit();
		});
	}
}
