import { Directive, HostBinding, Input, booleanAttribute } from '@angular/core';
import { ThyTranslate } from 'ngx-tethys/core';

/**
 * @name thyFormGroupLabel
 * @order 45
 */
@Directive({
    selector: '[thyFormGroupLabel]',
    standalone: true
})
export class ThyFormGroupLabelDirective {
    public labelText: string;

    @HostBinding('class.label-required') labelRequired = false;

    @HostBinding('class.col-form-label') _isFormGroupLabel = true;

    @Input()
    set thyLabelText(value: string) {
        this.labelText = value;
    }

    @Input()
    set thyLabelTranslateKey(translateKey: string) {
        if (translateKey) {
            this.labelText = this.thyTranslate.instant(translateKey);
        }
    }

    @Input({ transform: booleanAttribute })
    set thyLabelRequired(value: boolean) {
        this.labelRequired = value;
    }

    constructor(private thyTranslate: ThyTranslate) {}
}
