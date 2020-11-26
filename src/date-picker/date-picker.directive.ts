import { forwardRef, ChangeDetectorRef, ElementRef, OnInit, Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PickerDirective } from './abstract-picker.directive';
import { ThyPopover } from 'ngx-tethys/popover';

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

    constructor(elementRef: ElementRef, cdr: ChangeDetectorRef, thyPopover: ThyPopover) {
        super(elementRef, cdr, thyPopover);
    }
}
