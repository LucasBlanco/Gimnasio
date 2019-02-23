import { Component, Input, EventEmitter, Output } from '@angular/core';

declare var $: any

export class ModalInterface {

    callbackFunction: Function
    modalId: string

    executeParentFunction(parentFunctionArgument) {
        this.hide()
        this.callbackFunction(parentFunctionArgument)
    }
    show() {
        $('#' + this.modalId).modal('show');
		$('#' + this.modalId).css('z-index', '1500');
    }
    hide() {
        $('#' + this.modalId).modal('hide');
    }

}
