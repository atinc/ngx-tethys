import { Component, forwardRef, HostBinding, HostListener, Input, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThyTranslate } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { ThyFormCheckBaseComponent } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-checkbox,[thy-checkbox],[thyCheckbox]',
    templateUrl: './checkbox.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyCheckboxComponent),
            multi: true
        }
    ]
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
