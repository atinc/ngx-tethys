import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyTranslate } from 'ngx-tethys/core';
import { ThyFormCheckBaseComponent } from 'ngx-tethys/shared';
import { coerceBooleanProperty } from 'ngx-tethys/util';

@Component({
    selector: 'thy-checkbox,[thy-checkbox],[thyCheckbox]',
    templateUrl: './checkbox.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyCheckboxComponent),
            multi: true
        }
    ],
    host: {
        class: 'thy-checkbox',
        '[class.disabled]': '_disabled',
        '[class.mb-0]': '_isFormCheckInline'
    }
})
export class ThyCheckboxComponent extends ThyFormCheckBaseComponent {
    isIndeterminate = false;

    /**
     * 设置 indeterminate 状态，只负责样式控制
     * @description-en-us Set the indeterminate state, responsible only for style control
     */
    @Input()
    set thyIndeterminate(value: boolean) {
        this.isIndeterminate = coerceBooleanProperty(value);
    }

    constructor(thyTranslate: ThyTranslate) {
        super(thyTranslate);
    }
}
