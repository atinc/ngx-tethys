import { forwardRef, ChangeDetectorRef, ElementRef, OnInit, Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PickerDirective } from './abstract-picker.directive';
import { ThyPopover } from '../popover';

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

    constructor(elementRef: ElementRef, cdr: ChangeDetectorRef, thyPopover: ThyPopover) {
        super(elementRef, cdr, thyPopover);
    }
}
