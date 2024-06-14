import { Directive, HostBinding, Input } from '@angular/core';
import { ThyTranslate } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

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

    @Input({ transform: coerceBooleanProperty })
    set thyLabelRequired(value: boolean) {
        this.labelRequired = value;
    }

    constructor(private thyTranslate: ThyTranslate) {}
}
