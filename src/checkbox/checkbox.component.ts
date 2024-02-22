import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean, ThyTranslate } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { ThyFormCheckBaseComponent } from 'ngx-tethys/shared';
import { NgClass, NgIf } from '@angular/common';

/**
 * 多选框组件
 * @name thy-checkbox,[thy-checkbox],[thyCheckbox]
 * @order 10
 */
@Component({
    selector: 'thy-checkbox,[thy-checkbox],[thyCheckbox]',
    templateUrl: './checkbox.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyCheckbox),
            multi: true
        }
    ],
    host: {
        '[attr.tabindex]': '-1',
        class: 'thy-checkbox',
        '[class.disabled]': '_disabled'
    },
    standalone: true,
    imports: [NgClass, NgIf]
})
export class ThyCheckbox extends ThyFormCheckBaseComponent {
    isIndeterminate = false;

    /**
     * 设置 indeterminate 状态，只负责样式控制
     * @description.en-us Set the indeterminate state, responsible only for style control
     * @default false
     */
    @Input()
    @InputBoolean()
    set thyIndeterminate(value: boolean) {
        this.isIndeterminate = coerceBooleanProperty(value);
    }

    constructor(thyTranslate: ThyTranslate) {
        super(thyTranslate);
    }
}
