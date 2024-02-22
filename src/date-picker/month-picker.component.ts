import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { NgIf } from '@angular/common';
import { BasePicker } from './base-picker.component';
import { DatePopup } from './lib/popups/date-popup.component';
import { ThyPicker } from './picker.component';

/**
 * 月份选择组件
 * @name thy-month-picker
 * @order 40
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'thy-month-picker',
    exportAs: 'thyMonthPicker',
    templateUrl: './base-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ThyMonthPicker)
        }
    ],
    standalone: true,
    imports: [ThyPicker, NgIf, DatePopup]
})
export class ThyMonthPicker extends BasePicker {
    /**
     * 展示的月份格式
     */
    @Input() thyFormat = 'yyyy-MM';

    private hostRenderer = useHostRenderer();

    constructor(cdr: ChangeDetectorRef, protected element: ElementRef) {
        super(cdr, element);
        this.hostRenderer.addClass('thy-calendar-picker');
        this.thyMode = 'month';
    }
}
