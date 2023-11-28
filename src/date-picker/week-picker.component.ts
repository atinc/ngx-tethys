import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { BasePicker } from './base-picker.component';
import { DatePopup } from './lib/popups/date-popup.component';
import { NgIf } from '@angular/common';
import { ThyPicker } from './picker.component';

/**
 * 周选择组件
 * @name thy-week-picker
 * @order 30
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'thy-week-picker',
    exportAs: 'thyWeekPicker',
    templateUrl: './base-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ThyWeekPicker)
        }
    ],
    standalone: true,
    imports: [ThyPicker, NgIf, DatePopup]
})
export class ThyWeekPicker extends BasePicker {
    showWeek = true;

    private hostRenderer = useHostRenderer();

    constructor(cdr: ChangeDetectorRef, protected elementRef: ElementRef) {
        super(cdr, elementRef);
        this.hostRenderer.addClass('thy-calendar-picker');
        this.thyMode = 'week';
    }
}
