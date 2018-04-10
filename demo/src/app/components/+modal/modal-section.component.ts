import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ThyModalService } from '../../../../../src/modal';
@Component({
    selector: 'demo-modal-section',
    templateUrl: './modal-section.component.html'
})
export class DemoModalSectionComponent implements OnInit {

    public time = 0;
    modalRef: BsModalRef;
    constructor(
        private modalService: ThyModalService
    ) { }

    ngOnInit() {

    }

    addModal(template: TemplateRef<any>, option?: object): void {
        this.modalRef = this.modalService.show(template, option);
    }

    closeModal() {
        this.modalRef.hide();
    }
}
