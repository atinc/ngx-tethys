import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'demo-modal-section',
    templateUrl: './modal-section.component.html'
})
export class DemoModalSectionComponent {

    modalRef: BsModalRef;
    constructor(
        private modalService: BsModalService
    ) { }

    addModal(template: TemplateRef<any>,option:object): void {
        this.modalRef = this.modalService.show(template,option);
    }

    closeModal() {
        this.modalRef.hide();
    }
}
