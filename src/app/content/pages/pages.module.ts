import { LayoutModule } from '../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ActionComponent } from './header/action/action.component';
import { ProfileComponent } from './header/profile/profile.component';
import { CoreModule } from '../../core/core.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { ErrorPageComponent } from './snippets/error-page/error-page.component';
import {FormsModule} from '@angular/forms';
import {AbmSociosComponent} from './components/abm-socios/abm-socios.component';
import {SharedModule} from './components/shared-components/shared.module';
import {AMSociosComponent} from './components/abm-socios/am-socios/am-socios.component';
import {TablaSociosComponent} from './components/abm-socios/tabla-socios/tabla-socios.component';
import {CajaComponent} from './components/caja/caja.component';
import {HttpServiceSocios} from '../services/httpServiceSocios';
import {HttpServiceCaja} from '../services/httpServiceCaja';
import {HttpModule} from '@angular/http';
import {IngresosComponent} from './components/caja/ingresos/ingresos.component';
import {TablaMovimientosComponent} from './components/caja/movimientos/tabla-movimientos.component';
import {SociosModule} from './components/socio/socios.module';
import {NavegacionSocioComponent} from './components/socio/navegacion-socio/navegacion-socio.component';
import {AbmMembresiaComponent} from './components/abm-membresia/abm-membresia.component';
import {HttpServiceMembresia} from '../services/httpServiceMembresia';
import {AmMembresiaComponent} from './components/abm-membresia/am-membresia/am-membresia.component';
import {TablaMembresiaComponent} from './components/abm-membresia/tabla-membresia/tabla-membresia.component';
import {AbmServicioComponent} from './components/abm-servicio/abm-servicio.component';
import {AmServicioComponent} from './components/abm-servicio/am-servicio/am-servicio.component';
import {TablaServicioComponent} from './components/abm-servicio/tabla-servicio/tabla-servicio.component';
import {HttpServiceServicio} from '../services/httpServiceServicio';
import {HttpServiceDescuento} from '../services/httpServiceDescuento';
import {AbmDescuentoComponent} from './components/abm-descuento/abm-descuento.component';
import {AmDescuentoComponent} from './components/abm-descuento/am-descuento/am-descuento.component';
import {TablaDescuentoComponent} from './components/abm-descuento/tabla-descuento/tabla-servicio.component';
import {HttpService} from '../services/httpService';
import {SociosService} from './components/socio/serviceSocio';
import {AbmProductoComponent} from './components/abm-producto/abm-producto.component';

import { PartialsModule } from '../partials/partials.module';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { VencimientoSociosComponent } from './components/vencimiento-socios/vencimiento-socios.component';


@NgModule({
	declarations: [
		PagesComponent,
		ActionComponent,
		ProfileComponent,
		ErrorPageComponent,
		AbmSociosComponent,
		AMSociosComponent,
		TablaSociosComponent,
		CajaComponent,
		IngresosComponent,
		TablaMovimientosComponent,
		AmMembresiaComponent,
		TablaMembresiaComponent,
		AbmMembresiaComponent,
		AmServicioComponent,
		TablaServicioComponent,
		AbmServicioComponent,
		AbmDescuentoComponent,
		AmDescuentoComponent,
		TablaDescuentoComponent,
		AbmProductoComponent,
		VencimientoSociosComponent
	],
	imports: [
		FormsModule,
		CommonModule,
		HttpClientModule,
		HttpModule,
		PagesRoutingModule,
		CoreModule,
		LayoutModule,
		AngularEditorModule,
		SharedModule,
		SociosModule,
		PartialsModule,
		NgxTypeaheadModule
	],
	providers: [
		]
})
export class PagesModule {}
