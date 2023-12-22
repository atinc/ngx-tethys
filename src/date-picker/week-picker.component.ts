import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { BasePickerComponent } from './base-picker.component';
import { DatePopupComponent } from './lib/popups/date-popup.component';
import { NgIf } from '@angular/common';
import { ThyPickerComponent } from './picker.component';

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
            useExisting: forwardRef(() => ThyWeekPickerComponent)
        }
    ],
    standalone: true,
    imports: [ThyPickerComponent, NgIf, DatePopupComponent]
})
export class ThyWeekPickerComponent extends BasePickerComponent {
    showWeek = true;

    private hostRenderer = useHostRenderer();

    constructor(cdr: ChangeDetectorRef, protected elementRef: ElementRef) {
        super(cdr, elementRef);
        this.hostRenderer.addClass('thy-calendar-picker');
        this.thyMode = 'week';
    }
}
