import { Component, OnInit, TemplateRef } from '@angular/core';
import { ThyModalService } from '../../../../../../src/modal';

@Component({
    selector: 'app-demo-form-modal',
    templateUrl: './form-modal.component.html'
})
export class DemoFormModalComponent implements OnInit {
    model: any = {
        projectName: 'project name',
        username: 'user name'
    };
    constructor(private thyModalService: ThyModalService) {}

    ngOnInit(): void {}

    openFormModal(template: TemplateRef<any>) {
        this.thyModalService.show(template);
    }

    modalFormSubmit() {
        console.log(`modal form submit success!`);
    }
}
