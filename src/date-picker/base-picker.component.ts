import { InputBoolean, ThyPlacement } from 'ngx-tethys/core';
import { coerceBooleanProperty, elementMatchClosest, FunctionProp, TinyDate } from 'ngx-tethys/util';

import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';

import { AbstractPickerComponent } from './abstract-picker.component';
import { CompatibleValue, RangeAdvancedValue } from './inner-types';
import { CompatibleDate, ThyPanelMode } from './standard-types';
import { ThyPickerComponent } from './picker.component';

/**
 * @private
 */
@Component({
    template: ``,
    standalone: true,
    host: {
        '[attr.tabindex]': `tabIndex`,
        '(focus)': 'onFocus($event)',
        '(blur)': 'onBlur($event)'
    }
})
export class BasePickerComponent extends AbstractPickerComponent implements OnInit, OnChanges {
    showWeek = false;

    panelMode: ThyPanelMode | ThyPanelMode[];

    initialized: boolean;

    @ViewChild('thyPicker', { static: true }) thyPicker: ThyPickerComponent;

    @Input() thyDateRender: FunctionProp<TemplateRef<Date> | string>;

    @Input() set thyMode(value: ThyPanelMode) {
        this._panelMode = value ?? 'date';
        if (this.initialized) {
            this.setDefaultTimePickerState(this._panelMode);
        }
    }

    get thyMode() {
        return this._panelMode;
    }

    /**
     * @type EventEmitter<ThyPanelMode | ThyPanelMode[]>
     */
    @Output() readonly thyOnPanelChange = new EventEmitter<ThyPanelMode | ThyPanelMode[]>();

    /**
     * @type EventEmitter<Date[]>
     */
    @Output() readonly thyOnCalendarChange = new EventEmitter<Date[]>();

    private _showTime: object | boolean;

    /**
     * 增加时间选择功能
     * @default false
     */
    @Input() get thyShowTime(): object | boolean {
        return this._showTime;
    }
    set thyShowTime(value: object | boolean) {
        this._showTime = typeof value === 'object' ? value : coerceBooleanProperty(value);
    }

    /**
     * 是否展示时间(时、分)
     * @default false
     */
    @Input() @InputBoolean() thyMustShowTime = false;

    /**
     * 弹出位置
     * @type top | topLeft | topRight | bottom | bottomLeft | bottomRight | left | leftTop | leftBottom | right | rightTop | rightBottom
     */
    @Input() thyPlacement: ThyPlacement = 'bottomLeft';

    /**
     * @type EventEmitter<CompatibleDate | null>
     */
    @Output() readonly thyOnOk = new EventEmitter<CompatibleDate | null>();

    constructor(cdr: ChangeDetectorRef, protected element: ElementRef) {
        super(cdr);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.setDefaultTimePickerState(this._panelMode);
        this.initialized = true;
    }

    onValueChange(value: CompatibleValue | RangeAdvancedValue): void {
        this.thyPicker.onTuoched = false;
        this.restoreTimePickerState(value as CompatibleValue);
        super.onValueChange(value);
        if (!this.flexible) {
            this.closeOverlay();
        }
    }

    onEnterValue(value: CompatibleValue | RangeAdvancedValue) {
        this.restoreTimePickerState(value as CompatibleValue);
        super.onValueChange(value);
    }

    // Displays the time directly when the time must be displayed by default
    setDefaultTimePickerState(value: ThyPanelMode) {
        this.withTime = this.thyMustShowTime;
        if (this.isRange) {
            this.panelMode = this.flexible ? ['date', 'date'] : [value, value];
        } else {
            this.panelMode = value;
        }
        this.showWeek = value === 'week';
        if (!this.thyFormat) {
            const inputFormats: { [key in ThyPanelMode]?: string } = {
                year: 'yyyy',
                month: 'yyyy-MM',
                week: 'yyyy-ww周',
                date: this.thyShowTime ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'
            };
            this.thyFormat = this.flexible ? inputFormats['date'] : inputFormats[value];
        }
    }

    // Restore after clearing time to select whether the original picker time is displayed or not
    restoreTimePickerState(value: CompatibleValue | null) {
        if (!value) {
            this.withTime = this.thyMustShowTime || this.originWithTime;
        }
    }

    // Emit thyOnCalendarChange when select date by thy-range-picker
    onCalendarChange(value: TinyDate[]): void {
        if (this.isRange) {
            const rangeValue = value.map(x => x.nativeDate);
            this.thyOnCalendarChange.emit(rangeValue);
        }
    }

    onShowTimePickerChange(show: boolean): void {
        this.withTime = show;
    }

    onResultOk(): void {
        if (this.isRange) {
            const value = this.thyValue as TinyDate[];
            if (value.length) {
                this.thyOnOk.emit([value[0].nativeDate, value[1].nativeDate]);
            } else {
                this.thyOnOk.emit([]);
            }
        } else {
            if (this.thyValue) {
                this.thyOnOk.emit((this.thyValue as TinyDate).nativeDate);
            } else {
                this.thyOnOk.emit(null);
            }
        }
        this.closeOverlay();
    }

    onOpenChange(open: boolean): void {
        this.thyOpenChange.emit(open);
        if (!open) {
            this.onTouchedFn();
        }
    }

    onFocus(event: Event) {
        this.picker.focus();
    }

    onBlur(event?: FocusEvent) {
        // Tab 聚焦后自动聚焦到 input 输入框，此分支下直接返回，无需触发 onTouchedFn
        if (elementMatchClosest(event?.relatedTarget as HTMLElement, ['date-popup', 'thy-picker'])) {
            return;
        }
        this.onTouchedFn();
    }

    onUpdateDate(event: TinyDate) {
        this.thyValue = event;
    }
}
