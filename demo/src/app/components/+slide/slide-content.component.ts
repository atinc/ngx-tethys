
import { Component, TemplateRef } from '@angular/core';
import { ThyModalService } from '../../../../../src';

@Component({
    selector: 'demo-slide-content',
    templateUrl: './slide-content.component.html'
})
export class DemoSlideContentComponent {

    public name: string;

    constructor(
        public modalService: ThyModalService
    ) { }

    addModal(template: TemplateRef<any>, option?: object): void {
        this.modalService.show(template, option);
    }
}
