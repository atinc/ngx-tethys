import { forwardRef, ChangeDetectorRef, ElementRef, OnInit, Directive, Input, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PickerDirective } from './abstract-picker.directive';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyShortcutPosition, ThyShortcutRange } from './standard-types';
import { helpers } from 'ngx-tethys/util';
import { ThyDatePickerConfigService } from './date-picker.service';

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

    @Input() thyShowShortcut: boolean = this.datePickerConfigService.showShortcut;

    @Input() set thyShortcutPosition(position: ThyShortcutPosition) {
        if (!!position) {
            this.shortcutPosition = position;
        }
    }

    @Input() set thyShortcutRanges(ranges: ThyShortcutRange[]) {
        if (ranges && helpers.isArray(ranges)) {
            this.shortcutRanges = [...ranges];
        }
    }

    shortcutRanges: ThyShortcutRange[] = this.datePickerConfigService.shortcutRanges;

    shortcutPosition: ThyShortcutPosition = this.datePickerConfigService.shortcutPosition;

    constructor(
        elementRef: ElementRef,
        cdr: ChangeDetectorRef,
        thyPopover: ThyPopover,
        private datePickerConfigService: ThyDatePickerConfigService
    ) {
        super(elementRef, cdr, thyPopover);
    }
}
