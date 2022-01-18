import { forwardRef, ChangeDetectorRef, ElementRef, OnInit, Directive, Input, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PickerDirective } from './abstract-picker.directive';
import { ThyPopover } from 'ngx-tethys/popover';
import { ShortcutPosition, ShortcutRange } from './standard-types';
import { helpers } from 'ngx-tethys/util';
import { ThyDatePickerShortcutConfig, THY_DATE_PICKER_SHORTCUT_CONFIG } from './date-picker.config';

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

    @Input() set thyShortcutPosition(position: ShortcutPosition) {
        if (!!position) {
            this.shortcutPosition = position;
        }
    }

    @Input() set thyShortcutRanges(ranges: ShortcutRange[] | boolean) {
        if (!ranges) {
            this.shortcutRanges = [];
        } else {
            if (helpers.isArray(ranges)) {
                this.shortcutRanges = [...this.datePickerShortcutConfig.presetShortcutRanges, ...ranges];
            } else {
                this.shortcutRanges = [...this.datePickerShortcutConfig.presetShortcutRanges];
            }
        }
    }

    shortcutPosition: ShortcutPosition = this.datePickerShortcutConfig.shortcutPosition;

    constructor(
        elementRef: ElementRef,
        cdr: ChangeDetectorRef,
        thyPopover: ThyPopover,
        @Inject(THY_DATE_PICKER_SHORTCUT_CONFIG) private datePickerShortcutConfig: ThyDatePickerShortcutConfig
    ) {
        super(elementRef, cdr, thyPopover);
    }
}
