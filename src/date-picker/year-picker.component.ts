import {
    forwardRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    Renderer2
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HeaderPickerComponent, SupportHeaderPanel } from './header-picker.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'thy-year-picker',
    exportAs: 'thyYearPicker',
    templateUrl: './header-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ThyYearPickerComponent)
        }
    ]
})
export class ThyYearPickerComponent extends HeaderPickerComponent {
    @Input() thyFormat = 'yyyy';

    endPanelMode: SupportHeaderPanel = 'year';

    constructor(cdr: ChangeDetectorRef, renderer: Renderer2, elementRef: ElementRef) {
        super(cdr);
        renderer.addClass(elementRef.nativeElement, 'thy-calendar-picker');
    }
}
