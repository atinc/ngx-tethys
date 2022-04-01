import { ThyPanelMode } from './standard-types';
import { forwardRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BasePickerComponent } from './base-picker.component';

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
    ]
})
export class ThyYearPickerComponent extends BasePickerComponent {
    @Input() thyFormat = 'yyyy';

    thyMode: ThyPanelMode = 'year';

    isRange = false;

    endPanelMode: ThyPanelMode = 'year';

    constructor(cdr: ChangeDetectorRef, renderer: Renderer2, elementRef: ElementRef) {
        super(cdr);
        renderer.addClass(elementRef.nativeElement, 'thy-calendar-picker');
    }
}
