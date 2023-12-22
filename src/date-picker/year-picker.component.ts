import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Inject,
    Input,
    NgZone,
    PLATFORM_ID
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { NgIf } from '@angular/common';
import { BasePickerComponent } from './base-picker.component';
import { DatePopupComponent } from './lib/popups/date-popup.component';
import { ThyPickerComponent } from './picker.component';
import { ThyPanelMode } from './standard-types';
import { ThyClickDispatcher } from 'ngx-tethys/core';

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
            useExisting: forwardRef(() => ThyYearPickerComponent)
        }
    ],
    standalone: true,
    imports: [ThyPickerComponent, NgIf, DatePopupComponent]
})
export class ThyYearPickerComponent extends BasePickerComponent {
    /**
     * 展示的年份格式
     * @type string
     */
    @Input() thyFormat = 'yyyy';

    isRange = false;

    endPanelMode: ThyPanelMode = 'year';

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
        this.thyMode = 'year';
    }
}
