import { Component} from '@angular/core';
import { ModalInterface } from './modalInterface.component';
import * as Modelos from '../modelos/generales';

@Component({
    selector: 'm-modal-select',
    templateUrl: './modalSelect.component.html',

})

export class ModalSelect extends ModalInterface {
    select: Modelos.Select = new Modelos.Select(null, null, null, null, null)
    modalId: string = 'modalSelect'
}
