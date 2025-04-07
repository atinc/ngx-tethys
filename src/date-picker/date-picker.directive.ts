import { forwardRef, OnInit, Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PickerDirective } from './abstract-picker.directive';

/**
 * 日期选择指令
 * @name thyDatePicker
 * @order 20
 */
@Directive({
    selector: '[thyDatePicker]',
    exportAs: 'thyDatePicker',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ThyDatePickerDirective)
        }
    ]
})
export class ThyDatePickerDirective extends PickerDirective implements OnInit {
    isRange = false;
}
