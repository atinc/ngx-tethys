import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ThyModalService } from '../modal/modal.service';
import { ConfirmOption } from './confirm-option.interface';

const ConfirmTranslateDefault = {
    modalTitleKey: 'common.DELETE_CONFIRM',
    modalDescriptionKey: 'common.DELETE_CONFIRM_TEXT',
    modalPrimaryLoadingTextKey: 'common.DELETING',
};

@Component({
    templateUrl: './confirm.component.html'
})
export class ThyConfirmComponent implements OnInit {

    loading: boolean;

    public title: string;

    public content: string;

    public buttons: ConfirmOption;


    constructor(
        private modalService: ThyModalService,
    ) { }

    ngOnInit() {


    }

    confirm(): any {

    }

    closeModal() {
        this.modalService.close();
    }
}
