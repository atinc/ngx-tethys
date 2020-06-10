import { Component, OnInit, TemplateRef } from '@angular/core';
import { ThyModalService } from '../../../../../../src/modal';
import { ThyDialog } from 'ngx-tethys';

@Component({
    selector: 'app-demo-form-modal',
    templateUrl: './form-modal.component.html'
})
export class DemoFormModalComponent implements OnInit {
    model: any = {
        projectName: 'project name',
        username: 'user name',
        role: '1'
    };

    validatorConfig = {
        validationMessages: {
            name: {
                required: '不能为空'
            }
        }
    };

    constructor(public thyDialog: ThyDialog) {}

    ngOnInit(): void {}

    openFormDialog(template: TemplateRef<any>) {
        this.thyDialog.open(template);
    }

    modalFormSubmit() {
        console.log(`modal form submit success!`);
    }
}
