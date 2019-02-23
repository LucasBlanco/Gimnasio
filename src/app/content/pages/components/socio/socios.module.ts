
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {NavegacionSocioComponent} from './navegacion-socio/navegacion-socio.component';
import {ComprasComponent} from './compras/compras.component';
import {SharedModule} from '../shared-components/shared.module';
import { PerfilComponent } from './perfil/perfil.component';
import {SociosService} from './serviceSocio';
import { HistorialComprasComponent } from './historial-compras/historial-compras.component';
import {AccesosComponent} from './accesos/accesos.component';
import { MembresiasCompradasComponent } from './membresias-compradas/membresias-compradas.component';


const parentModuleRoutes: Routes = [
	{
		path: '',            // <---- parent component declared here
		component: NavegacionSocioComponent,
		children: [                          // <---- child components declared here
			{
				path: 'compras/:id',
				component: ComprasComponent
			},
			{
				path: 'perfil/:id',
				component: PerfilComponent
			},
            {
                path: 'historial/:id',
                component: HistorialComprasComponent
            },
            {
                path: 'accesos/:id',
                component: AccesosComponent
            },
            {
                path: 'membresiasCompradas/:id',
                component: MembresiasCompradasComponent
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
		PerfilComponent,
		HistorialComprasComponent,
        AccesosComponent,
        MembresiasCompradasComponent
	],
	providers: [

	]
})

export class SociosModule { }

