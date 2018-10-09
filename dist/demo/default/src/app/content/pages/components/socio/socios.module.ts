
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {NavegacionSocioComponent} from "./navegacion-socio/navegacion-socio.component";
import {ComprasComponent} from "./compras/compras.component";
import {SharedModule} from "../shared.module";
import { PerfilComponent } from './perfil/perfil.component';
import {SociosService} from "./serviceSocio";


const parentModuleRoutes: Routes = [
	{
		path: '',            // <---- parent component declared here
		component: NavegacionSocioComponent,
		children: [                          // <---- child components declared here
			{
				path:'compras',
				component: ComprasComponent
			},
			{
				path:'perfil',
				component: PerfilComponent
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(parentModuleRoutes),
		SharedModule,
		CommonModule
	],
	declarations: [
		ComprasComponent,
		NavegacionSocioComponent,
		PerfilComponent
	],
	providers: [

	]
})

export class SociosModule { }

