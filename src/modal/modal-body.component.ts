import { Component, HostBinding, Input } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

@Component({
    selector: 'thy-modal-body',
    template: `<div class="modal-body" [ngClass]="{'modal-body--clear-padding':thyClearPaddingClassName}"><ng-content></ng-content></div>`
})
export class ModalBodyComponent {

    thyClearPaddingClassName = false;

    @Input()
    set thyClearPadding(value: string) {
        this.thyClearPaddingClassName = inputValueToBoolean(value);
    }

    constructor() { }
}
