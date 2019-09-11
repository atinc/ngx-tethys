import { Component, TemplateRef } from '@angular/core';
import { ThyModalService, ThyPopBoxService } from '../../../../../src/public-api';

@Component({
    selector: 'demo-slide-example',
    templateUrl: './slide-example.component.html'
})
export class DemoSlideExampleComponent {
    public name: string;

    public slideType = '';

    constructor(public modalService: ThyModalService, public thyPopBoxService: ThyPopBoxService) {}

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
            showMask: true
        });
    }

    itemClick() {}
}
