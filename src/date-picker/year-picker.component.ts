import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { BasePickerComponent } from './base-picker.component';
import { ThyPanelMode } from './standard-types';

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
    host: {
        '[attr.tabindex]': 'tabIndex'
    }
})
export class ThyYearPickerComponent extends BasePickerComponent {
    @Input() thyFormat = 'yyyy';

    thyMode: ThyPanelMode = 'year';

    isRange = false;

    endPanelMode: ThyPanelMode = 'year';

    private hostRenderer = useHostRenderer();

    constructor(cdr: ChangeDetectorRef, protected elementRef: ElementRef) {
        super(cdr, elementRef);
        this.hostRenderer.addClass('thy-calendar-picker');
    }
}
