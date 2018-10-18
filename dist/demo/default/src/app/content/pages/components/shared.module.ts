import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TablaComponent} from "./shared-components/tabla/tabla.component";
import {CommonModule} from '@angular/common';
import {FichaSocioComponent} from './shared-components/ficha-socio/ficha-socio.component';
import {ServicioComponent} from './servicio/servicio.component';
import {NgxTypeaheadModule} from 'ngx-typeahead';
import {TypeaheadComponent} from "./shared-components/typeahead/typeahead.component";
import {ModalInput} from "./shared-components/modalSingleElement/modalInput.component";
import {ModalSelect} from "./shared-components/modalSingleElement/modalSelect.component";
import { AbmProductoComponent } from './abm-producto/abm-producto.component';


@NgModule({
	declarations: [
		TablaComponent,
		FichaSocioComponent,
		ServicioComponent,
		TypeaheadComponent,
		ModalInput,
		ModalSelect
	],
	imports: [
		FormsModule, CommonModule, NgxTypeaheadModule
	],
	exports: [
		TablaComponent, FormsModule, FichaSocioComponent, ModalInput, ModalSelect
	]
})
export class SharedModule {}
