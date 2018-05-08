import { Directive, HostBinding, Input, ElementRef } from '@angular/core';
import { UpdateHostClassService } from '../shared';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

const inputGroupSizeMap = {
    'xs': ['form-control-xs'],
    'sm': ['form-control-sm'],
    'md': ['form-control-md'],
    'lg': ['form-control-lg']
};
@Directive({
    selector: '[thyInput]',
    providers: [
        UpdateHostClassService
    ],
})
export class ThyInputDirective {

    @HostBinding('class.form-control') _isFormControl = true;

    @Input()
    set thySize(size: InputSize) {
        if (size && inputGroupSizeMap[size]) {
            this.updateHostClassService.updateClass(inputGroupSizeMap[size]);
        } else {
            this.updateHostClassService.updateClass([]);
        }
    }

    constructor(
        private updateHostClassService: UpdateHostClassService,
        private elementRef: ElementRef
    ) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }
}
