import { Directive, HostBinding, Optional, Input, ViewEncapsulation } from '@angular/core';
import { ThyFormDirective } from './form.directive';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { ThyTranslate } from 'ngx-tethys/core';

@Directive({
    selector: '[thyFormGroupLabel]'
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
        this.labelText = this.thyTranslate.instant(translateKey);
    }

    @Input()
    set thyLabelRequired(value: string) {
        this.labelRequired = coerceBooleanProperty(value);
    }

    constructor(private thyTranslate: ThyTranslate) {}
}
