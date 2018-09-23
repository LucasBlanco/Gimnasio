import { NgModule } from '@angular/core';
import {Form, FormsModule} from '@angular/forms';
import {TablaComponent} from "./shared-components/tabla/tabla.component";
import { CommonModule } from '@angular/common';
import { FichaSocioComponent } from './shared-components/ficha-socio/ficha-socio.component';
import { ServicioComponent } from './servicio/servicio.component';
import { MembresiaComponent } from './membresia/membresia.component';



@NgModule({
	declarations: [
		TablaComponent,
		FichaSocioComponent,
		ServicioComponent,
		MembresiaComponent,

	],
	imports: [
		FormsModule, CommonModule
	],
	exports: [
		TablaComponent, FormsModule, FichaSocioComponent
	]
})
export class SharedModule {}
