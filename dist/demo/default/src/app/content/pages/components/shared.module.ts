import { NgModule } from '@angular/core';
import {Form, FormsModule} from '@angular/forms';
import {TablaComponent} from "./shared-components/tabla/tabla.component";
import { CommonModule } from '@angular/common';
import { FichaSocioComponent } from './shared-components/ficha-socio/ficha-socio.component';



@NgModule({
	declarations: [
		TablaComponent,
		FichaSocioComponent,

	],
	imports: [
		FormsModule, CommonModule
	],
	exports: [
		TablaComponent, FormsModule, FichaSocioComponent
	]
})
export class SharedModule {}
