import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { FileUploadModalComponent } from './file-upload-modal.component';

@Component({
  selector: 'm-file-upload',
  template: `
    <div class="row">
      <div class="col-10">
        <div class="custom-file">
          <input
            class="custom-file-input"
            type="file"
            accept="image/*"
            (change)="onSelectFile($event)"
          />
          <label class="custom-file-label" for="customFile">
            {{ fileName }}
          </label>
        </div>
      </div>
      <div class="col-2">
        <img [src]="file || fallbackFile" style="height: calc(2.95rem + 2px);" (click)="showImg()"/>
      </div>
    </div>
    <m-file-upload-modal [img]="file"></m-file-upload-modal>
  `
})
export class FileUploadComponent implements OnInit {
  fileName: string = 'Elegir archivo';
  file: string = null;
  @Input() defaultFile = null;
  @Input() fallbackFile = null;
  @Output() fileChange = new EventEmitter();
  @ViewChild(FileUploadModalComponent) modalImg
  constructor() {}

  ngOnInit() {
    this.file = this.defaultFile
  }

  onSelectFile(event) {
    // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.fileName = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = ev => {
        // called once readAsDataURL is completed
        this.file = (ev.target as any).result;
        this.fileChange.emit(this.file);
      };
    }
  }

  showImg(){
    this.modalImg.show()
  }
}
