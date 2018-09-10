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
import {AbmSociosComponent} from "./components/abm-socios/abm-socios.component";
import {SharedModule} from "./components/shared.module";
import {AMSociosComponent} from "./components/abm-socios/am-socios/am-socios.component";
import {TablaSociosComponent} from "./components/abm-socios/tabla-socios/tabla-socios.component";
import {CajaComponent} from "./components/caja/caja.component";
import {PagoSociosComponent} from "./components/pago-socios/pago-socios.component";
import {HttpServiceSocios} from "../services/htppServiceSocios";
import {HttpModule} from "@angular/http";
import {IngresosComponent} from "./components/caja/ingresos/ingresos.component";
import {TablaMovimientosComponent} from "./components/caja/movimientos/tabla-movimientos.component";

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
		PagoSociosComponent,
		IngresosComponent,
		TablaMovimientosComponent
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
		SharedModule
	],
	providers: [HttpServiceSocios]
})
export class PagesModule {}
