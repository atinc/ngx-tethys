import { Component,HostBinding } from '@angular/core';

@Component({
    selector: 'thy-modal',
    template: `<ng-content></ng-content>`
})

export class ModalComponent {

    @HostBinding('class.thy-modal--has-footer') hasFooter = false;

    constructor() { }
}
