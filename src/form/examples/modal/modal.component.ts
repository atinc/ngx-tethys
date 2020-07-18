import { Component, OnInit, TemplateRef } from '@angular/core';
import { ThyDialog } from 'ngx-tethys';

@Component({
    selector: 'thy-form-modal-example',
    templateUrl: './modal.component.html'
})
export class ThyFormModalExampleComponent implements OnInit {
    model = {
        projectName: 'project name',
        username: 'user name',
        role: 1
    };

    validatorConfig = {
        validationMessages: {
            projectName: {
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
