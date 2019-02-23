import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';
import { FichaSocioComponent } from './ficha-socio/ficha-socio.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { ModalInput } from './modalSingleElement/modalInput.component';
import { ModalSelect } from './modalSingleElement/modalSelect.component';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { ChecklistComponent } from './checklist/checklist.component';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadModalComponent } from './file-upload/file-upload-modal.component';
import { PopoverComponent } from './popover/popover.component';
import { TabsComponent } from './tabs/tabs.component';
import { MembresiaComponent } from './membresia/membresia.component';

@NgModule({
  declarations: [
    TablaComponent,
    FichaSocioComponent,
    TypeaheadComponent,
    ModalInput,
    ModalSelect,
    ChecklistComponent,
    DropzoneComponent,
    FileUploadComponent,
    FileUploadModalComponent,
    PopoverComponent,
    TabsComponent,
    MembresiaComponent
  ],
  imports: [FormsModule, CommonModule, NgxTypeaheadModule],
  exports: [
    TablaComponent,
    FormsModule,
    FichaSocioComponent,
    ModalInput,
    ModalSelect,
    ChecklistComponent,
    DropzoneComponent,
    FileUploadComponent,
    FileUploadModalComponent,
    PopoverComponent,
    TabsComponent,
    MembresiaComponent
  ]
})
export class SharedModule {}
