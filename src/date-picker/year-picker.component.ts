import { ThyPanelMode } from './standard-types';
import { forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';
import { BasePickerComponent } from './base-picker.component';
import { DatePopupComponent } from './lib/popups/date-popup.component';
import { NgIf } from '@angular/common';
import { ThyPickerComponent } from './picker.component';

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
    @Input() thyFormat = 'yyyy';

    thyMode: ThyPanelMode = 'year';

    isRange = false;

    endPanelMode: ThyPanelMode = 'year';

    private hostRenderer = useHostRenderer();

    constructor(cdr: ChangeDetectorRef) {
        super(cdr);
        this.hostRenderer.addClass('thy-calendar-picker');
    }
}
