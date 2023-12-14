import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { NgIf } from '@angular/common';
import { BasePickerComponent } from './base-picker.component';
import { DatePopupComponent } from './lib/popups/date-popup.component';
import { ThyPickerComponent } from './picker.component';
import { ThyPanelMode } from './standard-types';

/**
 * 季度选择组件
 * @name thy-quarter-picker
 * @order 60
 */
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'thy-quarter-picker',
    exportAs: 'thyQuarterPicker',
    templateUrl: './base-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ThyQuarterPickerComponent)
        }
    ],
    standalone: true,
    imports: [ThyPickerComponent, NgIf, DatePopupComponent]
})
export class ThyQuarterPickerComponent extends BasePickerComponent {
    /**
     * 展示的季度格式
     * @type string
     */
    @Input() thyFormat = 'yyyy-qqq';

    isRange = false;

    endPanelMode: ThyPanelMode = 'quarter';

    private hostRenderer = useHostRenderer();

    constructor(cdr: ChangeDetectorRef, protected elementRef: ElementRef) {
        super(cdr, elementRef);
        this.hostRenderer.addClass('thy-calendar-picker');
        this.thyMode = 'quarter';
    }
}
