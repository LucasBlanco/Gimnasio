import {Component,OnInit, Input} from '@angular/core';
declare var $: any
@Component({
  selector: 'app-preview-image',
  template: `
    <!-- Trigger the Modal -->

<div class="modal fade" id="modalImg" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="display: none">
  <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Previsualizacion</h5>
        <button type="button" class="close" (click)="cerrar()">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body m-scrollable">
        <img class="modal-content" [src]="url" >
      </div>
    </div>
  </div>
</div>

  `,
  styleUrls: ['./preview-image.component.css']
})
export class PreviewImageComponent{

  @Input() url;

  constructor() {}
  
  ngAfterViewInit() {
    // Get the modal
    
  /*  var modal = document.getElementById('modalImg');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById('myImg');
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    img.onclick = function () {
      modal.style.display = "block";
      (modalImg as any).src = (this as any).src;
      captionText.innerHTML = (this as any).alt;
    }*/
  }
  // Get the modal

  cerrar(){
    $("#modalImg").modal('hide')
  }
}