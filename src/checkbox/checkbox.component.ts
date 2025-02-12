import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyFormCheckBaseComponent } from 'ngx-tethys/shared';
import { NgClass } from '@angular/common';
import { coerceBooleanProperty } from 'ngx-tethys/util';

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
    imports: [NgClass]
})
export class ThyCheckbox extends ThyFormCheckBaseComponent {
    isIndeterminate = false;

    /**
     * 设置 indeterminate 状态，只负责样式控制
     * @description.en-us Set the indeterminate state, responsible only for style control
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    set thyIndeterminate(value: boolean) {
        this.isIndeterminate = value;
    }
}
