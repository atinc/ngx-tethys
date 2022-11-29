import { Directive, ElementRef, HostBinding, Input, OnInit, Optional, Renderer2, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { UpdateHostClassService } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

export type ThyInputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

const inputGroupSizeMap = {
    xs: ['form-control-xs'],
    sm: ['form-control-sm'],
    md: ['form-control-md'],
    lg: ['form-control-lg']
};

/**
 * 输入框指令
 * @name thyInput
 * @order 10
 */
@Directive({
    selector: 'input[thyInput], select[thyInput]',
    providers: [UpdateHostClassService],
    exportAs: 'thyInput'
})
export class ThyInputDirective implements OnInit {
    @HostBinding('class.form-control') isFormControl = true;

    private autocomplete: boolean;

    private initialized = false;

    /**
     * 输入框大小
     * @type 'xs' | 'sm' | 'md' | 'default' | 'lg'
     * @default default
     */
    @Input()
    set thySize(size: ThyInputSize) {
        if (size && inputGroupSizeMap[size]) {
            this.updateHostClassService.updateClass(inputGroupSizeMap[size]);
        } else {
            this.updateHostClassService.updateClass([]);
        }
    }

    /**
     * 输入字段是否应该启用自动完成功能
     * @default false
     */
    @Input()
    set thyAutocomplete(value: boolean) {
        this.autocomplete = coerceBooleanProperty(value);
        if (this.initialized) {
            this.setAutocomplete();
        }
    }

    get ngControl() {
        return this.control;
    }

    get nativeElement(): HTMLInputElement {
        return this.elementRef.nativeElement;
    }

    constructor(
        private updateHostClassService: UpdateHostClassService,
        private elementRef: ElementRef,
        private render: Renderer2,
        @Optional() @Self() private control: NgControl
    ) {
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
