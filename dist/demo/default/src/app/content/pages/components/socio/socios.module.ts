
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {NavegacionSocioComponent} from "./navegacion-socio/navegacion-socio.component";
import {AsignacionClasesComponent} from "./asignacion-clases/asignacion-clases.component";
import {SharedModule} from "../shared.module";
import { PerfilComponent } from './perfil/perfil.component';


const parentModuleRoutes: Routes = [
	{
		path: '',            // <---- parent component declared here
		component: NavegacionSocioComponent,
		children: [                          // <---- child components declared here
			{
				path:'asignar-clase/:id',
				component: AsignacionClasesComponent
			},
			{
				path:'perfil/:id',
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
		AsignacionClasesComponent,
		NavegacionSocioComponent,
		PerfilComponent
	]
})

export class SociosModule { }

