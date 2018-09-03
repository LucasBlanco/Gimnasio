import { Component} from '@angular/core';
declare var $: any

@Component({
    selector: 'checklist',
    template: ``,
})
export class ModalInterface{

    modalId: string

    show() {
        $("#"+this.modalId).modal('show');
    }
    hide() {
        $("#" + this.modalId).modal('hide');
    }
}
