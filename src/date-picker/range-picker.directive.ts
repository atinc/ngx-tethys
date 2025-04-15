import { forwardRef, OnInit, Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PickerDirective } from './abstract-picker.directive';

/**
 * 日期范围选择指令
 * @name thyRangePicker
 * @order 80
 */
@Directive({
    selector: '[thyRangePicker]',
    exportAs: 'thyRangePicker',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ThyRangePickerDirective)
        }
    ]
})
export class ThyRangePickerDirective extends PickerDirective implements OnInit {
    isRange = true;

    constructor() {
        super();
    }
}
