import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';

import { BasePicker } from './base-picker.component';
import { DatePopup } from './lib/popups/date-popup.component';
import { ThyPicker } from './picker.component';
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
            useExisting: forwardRef(() => ThyQuarterPicker)
        }
    ],
    imports: [ThyPicker, DatePopup]
})
export class ThyQuarterPicker extends BasePicker {
    protected elementRef: ElementRef;

    /**
     * 展示的季度格式
     * @type string
     */
    @Input() thyFormat = "yyyy-'Q'q";

    isRange = false;

    endPanelMode: ThyPanelMode = 'quarter';

    private hostRenderer = useHostRenderer();

    constructor() {
        super();

        this.hostRenderer.addClass('thy-calendar-picker');
        this.thyMode = 'quarter';
    }
}
