import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ViewChild
} from '@angular/core';
declare var $: any;
@Component({
  selector: 'm-file-upload-modal',
  template: `
    <div
      class="modal hide"
      id="modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Detalle
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body d-flex justify-content-center">
            <img
              [src]="img"
              style="object-fit:scale-down; max-width: 100%;  max-height: 300px;"
            />
          </div>
        </div>
      </div>
    </div>
  `
})
export class FileUploadModalComponent {
  @Input() img = null;

  show() {
    $('#modal').appendTo("body").modal('show');
  }
}
