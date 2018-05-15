import {
    Component, HostBinding, Input,
    ContentChild, TemplateRef, ElementRef,
    ViewEncapsulation
} from '@angular/core';
import { ThyTranslate, UpdateHostClassService } from '../shared';

export type buttonGroupSize = 'sm' | 'lg' | '';

const buttonGroupSizeMap = {
    sm: ['thy-button-group-sm'],
    lg: ['thy-button-group-lg']
};

@Component({
    selector: 'thy-button-group',
    template: '<ng-content></ng-content>',
    providers: [
        UpdateHostClassService
    ],
    encapsulation: ViewEncapsulation.None
})
export class ThyButtonGroupComponent {

    @Input()
    set thySize(size: buttonGroupSize) {
        if (size && buttonGroupSizeMap[size]) {
            this.updateHostClassService.updateClass(buttonGroupSizeMap[size]);
        } else {
            this.updateHostClassService.updateClass([]);
        }
    }

    @HostBinding('class.btn-group') _isButtonGroup = true;

    constructor(
        private thyTranslate: ThyTranslate,
        private updateHostClassService: UpdateHostClassService,
        private elementRef: ElementRef
    ) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }
}
