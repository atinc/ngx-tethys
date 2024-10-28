import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, OnInit, inject } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { BasePicker } from './base-picker.component';
import { DatePopup } from './lib/popups/date-popup.component';
import { ThyPicker } from './picker.component';

/**
 * 日期选择组件
 * @name thy-date-picker
 * @order 10
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'thy-date-picker',
    exportAs: 'thyDatePicker',
    templateUrl: './base-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ThyDatePicker)
        }
    ],
    standalone: true,
    imports: [ThyPicker, DatePopup],
    host: {
        '[attr.tabindex]': 'tabIndex'
    }
})
export class ThyDatePicker extends BasePicker implements OnInit {
    isRange = false;

    private hostRenderer = useHostRenderer();

    constructor() {
        const cdr = inject(ChangeDetectorRef);
        const element = inject(ElementRef);

        super(cdr, element);
        this.hostRenderer.addClass('thy-calendar-picker');
    }
}
