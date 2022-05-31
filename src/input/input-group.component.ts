import {
    Component,
    HostBinding,
    Input,
    ContentChild,
    TemplateRef,
    ElementRef,
    ViewEncapsulation,
    ChangeDetectionStrategy
} from '@angular/core';
import { ThyTranslate, UpdateHostClassService } from 'ngx-tethys/core';

export type InputGroupSize = 'sm' | 'lg' | 'md' | '';

const inputGroupSizeMap = {
    sm: ['input-group-sm'],
    lg: ['input-group-lg'],
    md: ['input-group-md']
};

@Component({
    selector: 'thy-input-group',
    templateUrl: './input-group.component.html',
    providers: [UpdateHostClassService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'thy-input-group',
        '[class.form-control]': 'prefixTemplate || suffixTemplate',
        '[class.thy-input-group-with-prefix]': 'prefixTemplate',
        '[class.thy-input-group-with-suffix]': 'suffixTemplate'
    }
})
export class ThyInputGroupComponent {
    public appendText: string;

    public prependText: string;

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

    @ContentChild('append') appendTemplate: TemplateRef<unknown>;

    @ContentChild('prepend') prependTemplate: TemplateRef<unknown>;

    @ContentChild('prefix') prefixTemplate: TemplateRef<unknown>;

    @ContentChild('suffix') suffixTemplate: TemplateRef<unknown>;

    constructor(
        private thyTranslate: ThyTranslate,
        private updateHostClassService: UpdateHostClassService,
        private elementRef: ElementRef
    ) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }
}
