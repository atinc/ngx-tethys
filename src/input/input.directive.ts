import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';
import { UpdateHostClassService } from 'ngx-tethys/shared';
import { coerceBooleanProperty } from 'ngx-tethys/util';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

const inputGroupSizeMap = {
    xs: ['form-control-xs'],
    sm: ['form-control-sm'],
    md: ['form-control-md'],
    lg: ['form-control-lg']
};

@Directive({
    selector: '[thyInput]',
    providers: [UpdateHostClassService]
})
export class ThyInputDirective implements OnInit {
    @HostBinding('class.form-control') _isFormControl = true;

    private autocomplete: boolean;

    private initialized = false;

    @Input()
    set thySize(size: InputSize) {
        if (size && inputGroupSizeMap[size]) {
            this.updateHostClassService.updateClass(inputGroupSizeMap[size]);
        } else {
            this.updateHostClassService.updateClass([]);
        }
    }

    @Input()
    set thyAutocomplete(value: boolean) {
        this.autocomplete = coerceBooleanProperty(value);
        if (this.initialized) {
            this.setAutocomplete();
        }
    }

    constructor(private updateHostClassService: UpdateHostClassService, private elementRef: ElementRef, private render: Renderer2) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    ngOnInit() {
        this.initialized = true;
        this.setAutocomplete();
    }

    private setAutocomplete() {
        this.render.setAttribute(this.elementRef.nativeElement, 'autocomplete', this.autocomplete ? 'on' : 'off');
    }
}
