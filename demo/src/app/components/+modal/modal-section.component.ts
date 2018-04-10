import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ThyModalService } from '../../../../../src/modal';
import { DemoModalContentComponent } from './modal.content.component';
@Component({
    selector: 'demo-modal-section',
    templateUrl: './modal-section.component.html'
})
export class DemoModalSectionComponent implements OnInit {

    modalRef: BsModalRef;
    message: string[] = [];
    constructor(
        private modalService: ThyModalService
    ) { }

    ngOnInit() {

    }

    addModal(template: TemplateRef<any>, option: object): void {
        this.message = [];
        // this.modalService.onShow.subscribe((reason: string) => {
        //     this.message.push('onShow');
        // });
        // this.modalService.onShown.subscribe(() => {
        //     this.message.push('onShown');
        // });
        // this.modalService.onHide.subscribe(() => {
        //     this.message.push('onHide');
        // });
        // this.modalService.onHidden.subscribe(() => {
        //     this.message.push('onHidden');
        // });
        this.modalRef = this.modalService.show(template, option);
    }

    openModalComponent() {
        this.modalRef = this.modalService.show(DemoModalContentComponent, {
            initialState: {
                list: [
                    'Open a modal with component',
                    'Pass your data',
                    'Do something else',
                    '...'
                ],
                title: 'Modal with component'
            }
        });
    }

    hideModal() {
        this.modalService.close();
    }

    closeModal() {
        this.modalRef.hide();
    }
}
