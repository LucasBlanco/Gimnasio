import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ActionComponent } from './header/action/action.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ProfileComponent } from './header/profile/profile.component';
import { ErrorPageComponent } from './snippets/error-page/error-page.component';
import {AbmSociosComponent} from "./components/abm-socios/abm-socios.component";
import {CajaComponent} from "./components/caja/caja.component";
import {AsignacionClasesComponent} from "./components/socio/asignacion-clases/asignacion-clases.component";
import {ServicioComponent} from "./components/servicio/servicio.component";
import {MembresiaComponent} from "./components/membresia/membresia.component";

const routes: Routes = [
	{
		path: '',
		component: PagesComponent,
		canActivate: [NgxPermissionsGuard],
		children: [
			{
				path: '',
				loadChildren: './components/dashboard/dashboard.module#DashboardModule'
			},
			{
				path: 'socio',
				loadChildren: './components/socio/socios.module#SociosModule'
			},
			{
				path: 'servicio',
				component: ServicioComponent
			},
			{
				path: 'membresia',
				component: MembresiaComponent
			},
			{
				path: 'caja/:view',
				component: CajaComponent
			},
			{
				path: 'builder',
				loadChildren: './builder/builder.module#BuilderModule'
			},
			{
				path: 'header/actions',
				component: ActionComponent
			},
			{
				path: 'profile',
				component: ProfileComponent
			},
			{
				path:'socios/:view',
				component: AbmSociosComponent,
			}
		]
	},
	{
		path: 'login',
		canActivate: [NgxPermissionsGuard],
		loadChildren: './auth/auth.module#AuthModule',
		data: {
			permissions: {
				except: 'ADMIN'
			}
		},
	},
	{
		path: '404',
		component: ErrorPageComponent
	},
	{
		path: 'error/:type',
		component: ErrorPageComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {}
