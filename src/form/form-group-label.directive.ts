import { Directive, HostBinding, Input, inject } from '@angular/core';
import { ThyTranslate } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * @name thyFormGroupLabel
 * @order 45
 */
@Directive({
    selector: '[thyFormGroupLabel]'
})
export class ThyFormGroupLabelDirective {
    private thyTranslate = inject(ThyTranslate);

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
}
