import { forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, Input, inject } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { BasePicker } from './base-picker.component';
import { DatePopup } from './lib/popups/date-popup.component';
import { ThyPicker } from './picker.component';
import { helpers } from 'ngx-tethys/util';

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
            useExisting: forwardRef(() => ThyRangePicker)
        }
    ],
    standalone: true,
    imports: [ThyPicker, DatePopup]
})
export class ThyRangePicker extends BasePicker implements OnInit {
    protected elementRef: ElementRef;

    isRange = true;

    private hostRenderer = useHostRenderer();

    constructor() {
        const cdr = inject(ChangeDetectorRef);
        const elementRef = inject(ElementRef);

        super(cdr, elementRef);
        this.elementRef = elementRef;

        this.hostRenderer.addClass('thy-calendar-picker');
    }
}
