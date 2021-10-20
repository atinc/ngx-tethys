import { PanelMode } from './standard-types';
import {
    forwardRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Renderer2,
    NgZone,
    OnInit,
    Input
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BasePickerComponent } from './base-picker.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'thy-range-picker',
    exportAs: 'thyRangePicker',
    templateUrl: './base-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ThyRangePickerComponent)
        }
    ]
})
export class ThyRangePickerComponent extends BasePickerComponent implements OnInit {
    isRange = true;

    @Input() thyMode: PanelMode = 'date';

    constructor(cdr: ChangeDetectorRef, protected renderer: Renderer2, protected elementRef: ElementRef) {
        super(cdr);
        renderer.addClass(elementRef.nativeElement, 'thy-calendar-picker');
    }
}
