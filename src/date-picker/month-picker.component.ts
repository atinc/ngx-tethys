import {
    forwardRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Host,
    Input,
    Optional,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
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
    ]
})
export class ThyMonthPickerComponent extends BasePickerComponent {
    @Input() thyFormat = 'yyyy-MM';

    thyMode: ThyPanelMode = 'month';

    constructor(cdr: ChangeDetectorRef, renderer: Renderer2, elementRef: ElementRef) {
        super(cdr);
        renderer.addClass(elementRef.nativeElement, 'thy-calendar-picker');
    }
}
