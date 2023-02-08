import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { BasePickerComponent } from './base-picker.component';
import { ThyPanelMode } from './standard-types';

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
    host: {
        '[attr.tabindex]': 'tabIndex'
    }
})
export class ThyMonthPickerComponent extends BasePickerComponent {
    @Input() thyFormat = 'yyyy-MM';

    thyMode: ThyPanelMode = 'month';

    private hostRenderer = useHostRenderer();

    constructor(cdr: ChangeDetectorRef, protected element: ElementRef) {
        super(cdr, element);
        this.hostRenderer.addClass('thy-calendar-picker');
    }
}
