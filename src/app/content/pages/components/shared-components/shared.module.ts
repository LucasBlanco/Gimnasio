import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TablaComponent } from "./tabla/tabla.component";
import { FichaSocioComponent } from "./ficha-socio/ficha-socio.component";
import { TypeaheadComponent } from "./typeahead/typeahead.component";
import { ModalInput } from "./modalSingleElement/modalInput.component";
import { ModalSelect } from "./modalSingleElement/modalSelect.component";
import { NgxTypeaheadModule } from "ngx-typeahead";
import { ChecklistComponent } from "./checklist/checklist.component";
import { DropzoneComponent } from "./dropzone/dropzone.component";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { FileUploadModalComponent } from "./file-upload/file-upload-modal.component";
import { PopoverComponent } from "./popover/popover.component";
import { TabsComponent } from "./tabs/tabs.component";
import { MembresiaComponent } from "./membresia/membresia.component";
import { DatePickerComponent } from "./date-picker/date-picker.component";
import { NgDatepickerModule } from "ng2-datepicker";
import { PortletComponent } from "./portlet/portlet.component";
import { PortletHeaderComponent } from "./portlet/portlet-header/portlet-header.component";
import { PortletBodyComponent } from "./portlet/portlet-body/portlet-body.component";
import { ModalComponent } from "./modal/modal.component";
import { ListaComponent } from "./lista/lista.component";

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
    MembresiaComponent,
    DatePickerComponent,
    PortletComponent,
    PortletHeaderComponent,
    PortletBodyComponent,
    ModalComponent,
    ListaComponent
  ],
  imports: [FormsModule, CommonModule, NgxTypeaheadModule, NgDatepickerModule],

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
    MembresiaComponent,
    DatePickerComponent,
    PortletComponent,
    PortletHeaderComponent,
    PortletBodyComponent,
    ListaComponent
  ]
})
export class SharedModule {}
