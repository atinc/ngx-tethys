import { Component, HostBinding, Input, ContentChild, TemplateRef, ElementRef, ViewEncapsulation } from '@angular/core';
import { ThyTranslate, UpdateHostClassService } from '../shared';

export type InputGroupSize = 'sm' | 'lg' | '';

const inputGroupSizeMap = {
    sm: ['input-group-sm'],
    lg: ['input-group-lg']
};

@Component({
    selector: 'thy-input-group',
    templateUrl: './input-group.component.html',
    providers: [UpdateHostClassService],
    encapsulation: ViewEncapsulation.None
})
export class ThyInputGroupComponent {
    public appendText: string;

    public prependText: string;

    @HostBinding('class.thy-input-group') _isInputGroup = true;

    @Input()
    set thyAppendText(value: string) {
        this.appendText = value;
    }

    @Input()
    set thyAppendTextTranslateKey(value: string) {
        if (value) {
            this.appendText = this.thyTranslate.instant(value);
        }
    }

    @Input()
    set thyPrependText(value: string) {
        this.prependText = value;
    }

    @Input()
    set thyPrependTextTranslateKey(value: string) {
        if (value) {
            this.prependText = this.thyTranslate.instant(value);
        }
    }

    @Input()
    set thySize(size: InputGroupSize) {
        if (size && inputGroupSizeMap[size]) {
            this.updateHostClassService.updateClass(inputGroupSizeMap[size]);
        } else {
            this.updateHostClassService.updateClass([]);
        }
    }

    @ContentChild('append', { static: true }) appendTemplate: TemplateRef<any>;

    @ContentChild('prepend', { static: true }) prependTemplate: TemplateRef<any>;

    constructor(
        private thyTranslate: ThyTranslate,
        private updateHostClassService: UpdateHostClassService,
        private elementRef: ElementRef
    ) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }
}
