import { forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';
import { BasePickerComponent } from './base-picker.component';

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
    ]
})
export class ThyDatePickerComponent extends BasePickerComponent implements OnInit {
    isRange = false;

    private hostRenderer = useHostRenderer();

    constructor(cdr: ChangeDetectorRef) {
        super(cdr);
        this.hostRenderer.addClass('thy-calendar-picker');
    }
}
