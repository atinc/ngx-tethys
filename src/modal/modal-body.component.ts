import { Component } from '@angular/core';

@Component({
    selector: 'thy-modal-body',
    template: `<div class="modal-body"><ng-content></ng-content></div>`
})
export class ModalBodyComponent {

    constructor() { }
}
