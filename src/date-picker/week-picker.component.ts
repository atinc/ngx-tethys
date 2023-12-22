import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, NgZone, PLATFORM_ID, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { BasePickerComponent } from './base-picker.component';
import { DatePopupComponent } from './lib/popups/date-popup.component';
import { NgIf } from '@angular/common';
import { ThyPickerComponent } from './picker.component';
import { ThyClickDispatcher } from 'ngx-tethys/core';

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

    constructor(
        cdr: ChangeDetectorRef,
        protected elementRef: ElementRef,
        protected thyClickDispatcher: ThyClickDispatcher,
        @Inject(PLATFORM_ID) protected platformId: string,
        protected ngZone: NgZone
    ) {
        super(cdr, elementRef, thyClickDispatcher, platformId, ngZone);
        this.hostRenderer.addClass('thy-calendar-picker');
        this.thyMode = 'week';
    }
}
