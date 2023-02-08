import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { BasePickerComponent } from './base-picker.component';
import { ThyPanelMode } from './standard-types';

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
    host: {
        '[attr.tabindex]': 'tabIndex'
    }
})
export class ThyWeekPickerComponent extends BasePickerComponent {
    showWeek = true;
    thyMode: ThyPanelMode = 'week';

    private hostRenderer = useHostRenderer();

    constructor(cdr: ChangeDetectorRef, protected elementRef: ElementRef) {
        super(cdr, elementRef);
        this.hostRenderer.addClass('thy-calendar-picker');
    }
}
