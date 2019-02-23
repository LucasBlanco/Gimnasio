import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'm-dropzone',
  template: `
    <form
      class="m-dropzone dropzone dz-clickable"
      action="inc/api/dropzone/upload.php"
      id="m-dropzone-one"
    >
      <div class="m-dropzone__msg dz-message needsclick">
        <h3 class="m-dropzone__msg-title">
          Drop files here or click to upload.
        </h3>
        <span class="m-dropzone__msg-desc"
          >This is just a demo dropzone. Selected files are
          <strong>not</strong> actually uploaded.</span
        >
      </div>
    </form>
  `
})
export class DropzoneComponent {
  @Output() onUpload = new EventEmitter();

  constructor() {}

  fileUpload(file) {
    this.onUpload.emit(file);
  }
}
