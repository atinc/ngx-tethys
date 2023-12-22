import { ThyShortcutPreset, ThyShortcutRange } from './standard-types';
import {
    forwardRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    Input,
    Inject,
    PLATFORM_ID,
    NgZone
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { NgIf } from '@angular/common';
import { BasePickerComponent } from './base-picker.component';
import { DatePopupComponent } from './lib/popups/date-popup.component';
import { ThyPickerComponent } from './picker.component';
import { helpers } from 'ngx-tethys/util';
import { ThyClickDispatcher } from 'ngx-tethys/core';

/**
 * 日期范围选择组件
 * @name thy-range-picker
 * @order 70
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'thy-range-picker',
    exportAs: 'thyRangePicker',
    templateUrl: './base-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ThyRangePickerComponent)
        }
    ],
    standalone: true,
    imports: [ThyPickerComponent, NgIf, DatePopupComponent]
})
export class ThyRangePickerComponent extends BasePickerComponent implements OnInit {
    isRange = true;

    private hostRenderer = useHostRenderer();

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

    constructor(
        cdr: ChangeDetectorRef,
        protected elementRef: ElementRef,
        protected thyClickDispatcher: ThyClickDispatcher,
        @Inject(PLATFORM_ID) protected platformId: string,
        protected ngZone: NgZone
    ) {
        super(cdr, elementRef, thyClickDispatcher, platformId, ngZone);
        this.hostRenderer.addClass('thy-calendar-picker');
    }
}
