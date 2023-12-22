import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Inject,
    NgZone,
    OnInit,
    PLATFORM_ID
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { NgIf } from '@angular/common';
import { BasePickerComponent } from './base-picker.component';
import { DatePopupComponent } from './lib/popups/date-popup.component';
import { ThyPickerComponent } from './picker.component';
import { ThyClickDispatcher } from 'ngx-tethys/core';

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
            useExisting: forwardRef(() => ThyDatePickerComponent)
        }
    ],
    standalone: true,
    imports: [ThyPickerComponent, NgIf, DatePopupComponent],
    host: {
        '[attr.tabindex]': 'tabIndex'
    }
})
export class ThyDatePickerComponent extends BasePickerComponent implements OnInit {
    isRange = false;

    private hostRenderer = useHostRenderer();

    constructor(
        cdr: ChangeDetectorRef,
        element: ElementRef,
        thyClickDispatcher: ThyClickDispatcher,
        @Inject(PLATFORM_ID) platformId: string,
        ngZone: NgZone
    ) {
        super(cdr, element, thyClickDispatcher, platformId, ngZone);
        this.hostRenderer.addClass('thy-calendar-picker');
    }
}
