
import { Component, TemplateRef } from '@angular/core';
import { ThyModalService, ThyPopBoxService } from '../../../../../src/public-api';
import { truncate } from 'fs';

@Component({
    selector: 'demo-slide-content',
    templateUrl: './slide-content.component.html'
})
export class DemoSlideContentComponent {

    public name: string;

    constructor(
        public modalService: ThyModalService,
        public thyPopBoxService: ThyPopBoxService
    ) { }

    addModal(template: TemplateRef<any>, option?: object): void {
        this.modalService.show(template, option);
    }

    addPopBox(templateRef: any, popBoxTemplate: any) {

        this.thyPopBoxService.show(popBoxTemplate, {
            target: templateRef.elementRef,
            insideAutoClose: false,
            outsideAutoClose: true,
            showMask: true,
            stopPropagation: true
        });
    }

    addPopBox1(templateRef: any, popBoxTemplate: any, config) {

        this.thyPopBoxService.show(popBoxTemplate, {
            target: templateRef.elementRef,
            insideAutoClose: true,
            outsideAutoClose: true,
            showMask: true,
        });
    }

    itemClick() {

    }
}
