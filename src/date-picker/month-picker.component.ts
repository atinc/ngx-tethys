import { forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BasePickerComponent } from './base-picker.component';
import { ThyPanelMode } from './standard-types';
import { useHostRenderer } from '@tethys/cdk/dom';
import { DatePopupComponent } from './lib/popups/date-popup.component';
import { NgIf } from '@angular/common';
import { ThyPickerComponent } from './picker.component';

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
    @Input() thyFormat = 'yyyy-MM';

    thyMode: ThyPanelMode = 'month';

    private hostRenderer = useHostRenderer();

    constructor(cdr: ChangeDetectorRef) {
        super(cdr);
        this.hostRenderer.addClass('thy-calendar-picker');
    }
}
