import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, model } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';
import { BasePicker } from './base-picker.component';
import { DatePopup } from './lib/popups/date-popup.component';
import { ThyPicker } from './picker.component';
import { ThyPanelMode } from './standard-types';

/**
 * 年份选择组件
 * @name thy-year-picker
 * @order 50
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'thy-year-picker',
    exportAs: 'thyYearPicker',
    templateUrl: './base-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ThyYearPicker)
        }
    ],
    imports: [ThyPicker, DatePopup]
})
export class ThyYearPicker extends BasePicker {
    protected elementRef: ElementRef;

    /**
     * 展示的年份格式
     */
    readonly thyFormat = model<string>('yyyy');

    isRange = false;

    endPanelMode: ThyPanelMode = 'year';

    private hostRenderer = useHostRenderer();

    constructor() {
        super();

        this.hostRenderer.addClass('thy-calendar-picker');
        this.thyMode = 'year';
    }
}
