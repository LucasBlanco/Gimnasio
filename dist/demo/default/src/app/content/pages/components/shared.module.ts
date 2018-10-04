import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TablaComponent} from "./shared-components/tabla/tabla.component";
import {CommonModule} from '@angular/common';
import {FichaSocioComponent} from './shared-components/ficha-socio/ficha-socio.component';
import {ServicioComponent} from './servicio/servicio.component';
import {NgxTypeaheadModule} from 'ngx-typeahead';
import {TypeaheadComponent} from "./shared-components/typeahead/typeahead.component";


@NgModule({
	declarations: [
		TablaComponent,
		FichaSocioComponent,
		ServicioComponent,
		TypeaheadComponent
	],
	imports: [
		FormsModule, CommonModule, NgxTypeaheadModule
	],
	exports: [
		TablaComponent, FormsModule, FichaSocioComponent
	]
})
export class SharedModule {}
