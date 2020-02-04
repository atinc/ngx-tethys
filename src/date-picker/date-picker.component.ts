import {
    forwardRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Renderer2,
    OnInit,
    NgZone
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

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

    constructor(cdr: ChangeDetectorRef, protected renderer: Renderer2, protected elementRef: ElementRef) {
        super(cdr);
        renderer.addClass(elementRef.nativeElement, 'thy-calendar-picker');
    }
}
