import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ActionComponent } from './header/action/action.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ProfileComponent } from './header/profile/profile.component';
import { ErrorPageComponent } from './snippets/error-page/error-page.component';
import {AbmSociosComponent} from './components/abm-socios/abm-socios.component';
import {CajaComponent} from './components/caja/caja.component';
import {AbmMembresiaComponent} from './components/abm-membresia/abm-membresia.component';
import {AbmServicioComponent} from './components/abm-servicio/abm-servicio.component';
import {AbmDescuentoComponent} from './components/abm-descuento/abm-descuento.component';
import {AbmProductoComponent} from './components/abm-producto/abm-producto.component';
import { VencimientoSociosComponent } from './components/vencimiento-socios/vencimiento-socios.component';
import { AbmProfesoresComponent } from './components/abm_profesor/abm-profesor.component';
import { AuthGuardService } from '../services/authService'

const routes: Routes = [
	{
		path: '',
		component: PagesComponent,
		canActivate: [NgxPermissionsGuard],
		children: [
			{
				path: '',
				loadChildren: './components/dashboard/dashboard.module#DashboardModule', 
				canActivate: [AuthGuardService]
			},
			{
				path: 'socio',
				loadChildren: './components/socio/socios.module#SociosModule',
				canActivate: [AuthGuardService]
			},
			{
				path: 'servicio/:view',
				component: AbmServicioComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'producto/:view',
				component: AbmProductoComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'checkMembresia/:view',
				component: AbmMembresiaComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'descuento/:view',
				component: AbmDescuentoComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'profesor/:view',
				component: AbmProfesoresComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'caja/:view',
				component: CajaComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'builder',
				loadChildren: './builder/builder.module#BuilderModule',
				canActivate: [AuthGuardService]
			},
			{
				path: 'header/actions',
				component: ActionComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'profile',
				component: ProfileComponent,
				canActivate: [AuthGuardService]
			},
			{
				path: 'socios/:view',
				component: AbmSociosComponent,
				canActivate: [AuthGuardService]
			}
			,
			{
				path: 'vencimientos',
				component: VencimientoSociosComponent,
				canActivate: [AuthGuardService]
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
