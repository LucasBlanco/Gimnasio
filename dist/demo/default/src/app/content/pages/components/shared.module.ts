import { NgModule } from '@angular/core';
import {Form, FormsModule} from '@angular/forms';
import {TablaComponent} from "./shared-components/tabla/tabla.component";
import { CommonModule } from '@angular/common';
import { FichaSocioComponent } from './shared-components/ficha-socio/ficha-socio.component';
import { ServicioComponent } from './servicio/servicio.component';
import { MembresiaComponent } from './membresia/membresia.component';
import { NgxTypeaheadModule } from '../../../../../node_modules/ngx-typeahead';
import {TypeaheadComponent} from "./shared-components/typeahead/typeahead.component";



@NgModule({
	declarations: [
		TablaComponent,
		FichaSocioComponent,
		ServicioComponent,
		MembresiaComponent,
		TypeaheadComponent
	],
	imports: [
		FormsModule, CommonModule, NgxTypeaheadModule
	],
	exports: [
		TablaComponent, FormsModule, FichaSocioComponent, TypeaheadComponent
	]
})
export class SharedModule {}
