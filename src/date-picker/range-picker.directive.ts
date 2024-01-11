import { forwardRef, ChangeDetectorRef, ElementRef, OnInit, Directive, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PickerDirective } from './abstract-picker.directive';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyShortcutPreset, ThyShortcutRange } from './standard-types';
import { helpers } from 'ngx-tethys/util';

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

    /**
     * 已废弃，请使用 thyShortcutPresets
     * @deprecated
     * @type ThyShortcutRange[]
     */
    @Input() set thyShortcutRanges(ranges: ThyShortcutRange[]) {
        if (ranges && helpers.isArray(ranges)) {
            const presets: ThyShortcutPreset[] = ranges.map(range => ({ title: range.title, value: [range.begin, range.end] }));
            this.shortcutPresets = [...presets];
        }
    }
    constructor(elementRef: ElementRef, cdr: ChangeDetectorRef, thyPopover: ThyPopover) {
        super(elementRef, cdr, thyPopover);
    }
}
