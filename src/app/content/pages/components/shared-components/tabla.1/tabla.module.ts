import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TablaComponent } from './tabla.component';
import { SubtablaDirective } from './subtabla.directive';

@NgModule({
    imports: [
        CommonModule, FormsModule
    ], exports: [
    ], declarations: [
		SubtablaDirective
    ]

})
export class tablaModule {

}
