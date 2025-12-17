import { ChangeDetectionStrategy, Component, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';
import { BasePicker } from './base-picker.component';
import { DatePopup } from './lib/popups/date-popup.component';
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
    imports: [ThyPicker, DatePopup]
})
export class ThyWeekPicker extends BasePicker {
    protected elementRef?: ElementRef;

    private hostRenderer = useHostRenderer();

    constructor() {
        super();
        this.hostRenderer.addClass('thy-calendar-picker');
        this.thyMode = 'week';
    }
}
