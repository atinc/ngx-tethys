import { Directive, computed, inject, input } from '@angular/core';
import { ThyTranslate } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * @name thyFormGroupLabel
 * @order 45
 */
@Directive({
    selector: '[thyFormGroupLabel]',
    host: {
        '[class.label-required]': 'thyLabelRequired()',
        '[class.col-form-label]': 'true'
    }
})
export class ThyFormGroupLabelDirective {
    private thyTranslate = inject(ThyTranslate);

    readonly thyLabelText = input<string>();

    readonly thyLabelTranslateKey = input<string>();

    readonly labelText = computed<string>(() => {
        if (this.thyLabelTranslateKey()) {
            return this.thyTranslate.instant(this.thyLabelTranslateKey());
        }
        return this.thyLabelText();
    });

    readonly thyLabelRequired = input(false, { transform: coerceBooleanProperty });
}
