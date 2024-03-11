import { forwardRef, ChangeDetectorRef, ElementRef, OnInit, Directive, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PickerDirective } from './abstract-picker.directive';
import { ThyPopover } from 'ngx-tethys/popover';

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
    ],
    standalone: true
})
export class ThyRangePickerDirective extends PickerDirective implements OnInit {
    isRange = true;

    constructor(elementRef: ElementRef, cdr: ChangeDetectorRef, thyPopover: ThyPopover) {
        super(elementRef, cdr, thyPopover);
    }
}
