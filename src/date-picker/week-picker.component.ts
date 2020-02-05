import {
    forwardRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Renderer2
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BasePickerComponent } from './base-picker.component';

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
    ]
})
export class ThyWeekPickerComponent extends BasePickerComponent {
    showWeek = true;

    constructor(cdr: ChangeDetectorRef, renderer: Renderer2, elementRef: ElementRef) {
        super(cdr);
        renderer.addClass(elementRef.nativeElement, 'thy-calendar-picker');
    }
}
