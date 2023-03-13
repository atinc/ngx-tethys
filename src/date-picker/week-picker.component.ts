import { forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';
import { BasePickerComponent } from './base-picker.component';
import { ThyPanelMode } from './standard-types';
import { DatePopupComponent } from './lib/popups/date-popup.component';
import { NgIf } from '@angular/common';
import { ThyPickerComponent } from './picker.component';

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
    thyMode: ThyPanelMode = 'week';

    private hostRenderer = useHostRenderer();

    constructor(cdr: ChangeDetectorRef) {
        super(cdr);
        this.hostRenderer.addClass('thy-calendar-picker');
    }
}
