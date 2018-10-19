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
    import {Socio} from '../../../models/socio';
    import {HttpServiceSocios} from '../../../services/httpServiceSocios';

@Component({
	selector: 'm-quick-sidebar',
	templateUrl: './quick-sidebar.component.html'
})
export class QuickSidebarComponent implements OnInit, AfterViewInit {
	@HostBinding('id') id = 'm_quick_sidebar';
	@HostBinding('class')
	classes = 'm-quick-sidebar m-quick-sidebar--tabbed m-quick-sidebar--skin-light';
	@HostBinding('attr.mQuickSidebarOffcanvas')
	mQuickSidebarOffcanvas: QuickSidebarOffcanvasDirective;
    subscription;
    sociosServicios: {socio: Socio, servicios: Servicio[]}[] = [];

	@HostBinding('style.overflow') styleOverflow: any = 'hidden';

	constructor(private el: ElementRef, private entradaSrv: HttpServiceEntrada) {}

	ngOnInit(): void {
        this.subscription = this.entradaSrv.onEntrada().subscribe(socioServicios => {
            this.sociosServicios.push(socioServicios); console.log('servicios', socioServicios);
        });

    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

	ngAfterViewInit(): void {
		Promise.resolve(null).then(() => {
			this.mQuickSidebarOffcanvas = new QuickSidebarOffcanvasDirective(this.el);
			// manually call the directives' lifecycle hook method
			this.mQuickSidebarOffcanvas.ngAfterViewInit();
		});
	}
}
