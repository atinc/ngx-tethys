import { forwardRef, ChangeDetectorRef, ElementRef, OnInit, Directive, Input, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PickerDirective } from './abstract-picker.directive';
import { ThyPopover } from 'ngx-tethys/popover';
import { ShortcutPosition, ShortcutRange } from './standard-types';
import { helpers } from 'ngx-tethys/util';
import { DatePickerConfig } from './date-picker.service';

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

    @Input() thyShowShortcut: boolean = this.datePickerConfig.showShortcut;

    @Input() set thyShortcutPosition(position: ShortcutPosition) {
        if (!!position) {
            this.shortcutPosition = position;
        }
    }

    @Input() set thyShortcutRanges(ranges: ShortcutRange[]) {
        if (ranges && helpers.isArray(ranges)) {
            this.shortcutRanges = [...ranges];
        }
    }

    shortcutRanges: ShortcutRange[] = this.datePickerConfig.shortcutRanges;

    shortcutPosition: ShortcutPosition = this.datePickerConfig.shortcutPosition;

    constructor(elementRef: ElementRef, cdr: ChangeDetectorRef, thyPopover: ThyPopover, private datePickerConfig: DatePickerConfig) {
        super(elementRef, cdr, thyPopover);
    }
}
