import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { NgIf } from '@angular/common';
import { BasePickerComponent } from './base-picker.component';
import { DatePopupComponent } from './lib/popups/date-popup.component';
import { ThyPickerComponent } from './picker.component';
import { ThyPanelMode } from './standard-types';

/**
 * 月份选择组件
 * @name thy-month-picker
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
            useExisting: forwardRef(() => ThyMonthPickerComponent)
        }
    ],
    standalone: true,
    imports: [ThyPickerComponent, NgIf, DatePopupComponent]
})
export class ThyMonthPickerComponent extends BasePickerComponent {
    /**
     * 展示的月份格式
     */
    @Input() thyFormat = 'yyyy-MM';

    thyMode: ThyPanelMode = 'month';

    private hostRenderer = useHostRenderer();

    constructor(cdr: ChangeDetectorRef, protected element: ElementRef) {
        super(cdr, element);
        this.hostRenderer.addClass('thy-calendar-picker');
    }
}
