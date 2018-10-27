import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TablaComponent} from './tabla/tabla.component';
import {FichaSocioComponent} from './ficha-socio/ficha-socio.component';
import {TypeaheadComponent} from './typeahead/typeahead.component';
import {ModalInput} from './modalSingleElement/modalInput.component';
import {ModalSelect} from './modalSingleElement/modalSelect.component';
import {NgxTypeaheadModule} from 'ngx-typeahead';



@NgModule({
	declarations: [
		TablaComponent,
		FichaSocioComponent,
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