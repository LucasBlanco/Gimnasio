import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipeFiltroCompleto } from '../pipes/filter/filters.pipe';

@NgModule({
    imports: [
        CommonModule, FormsModule
    ],
	declarations: [
        PipeFiltroCompleto
    ]
})
export class TablaModule {
}
