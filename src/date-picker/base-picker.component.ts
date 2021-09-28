import { ThyPlacement } from 'ngx-tethys/core';
import { coerceBooleanProperty, FunctionProp, TinyDate } from 'ngx-tethys/util';

import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef } from '@angular/core';

import { AbstractPickerComponent } from './abstract-picker.component';
import { CompatibleDate, CompatibleValue, PanelMode } from './standard-types';

@Component({
    template: ``
})
export class BasePickerComponent extends AbstractPickerComponent implements OnInit, OnChanges {
    showWeek = false;

    panelMode: PanelMode | PanelMode[];

    @Input() thyDateRender: FunctionProp<TemplateRef<Date> | string>;

    @Output() readonly thyOnPanelChange = new EventEmitter<PanelMode | PanelMode[]>();
    @Output() readonly thyOnCalendarChange = new EventEmitter<Date[]>();

    private _showTime: object | boolean;
    @Input() get thyShowTime(): object | boolean {
        return this._showTime;
    }
    set thyShowTime(value: object | boolean) {
        this._showTime = typeof value === 'object' ? value : coerceBooleanProperty(value);
    }

    @Input() thyMustShowTime = false;

    @Input() thyPlacement: ThyPlacement = 'bottomLeft';

    @Output() readonly thyOnOk = new EventEmitter<CompatibleDate | null>();

    constructor(cdr: ChangeDetectorRef) {
        super(cdr);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.setDefaultTimePickerState();
    }

    onValueChange(value: CompatibleValue): void {
        this.restoreTimePickerState(value);
        super.onValueChange(value);
        this.closeOverlay();
    }

    // Displays the time directly when the time must be displayed by default
    setDefaultTimePickerState() {
        this.withTime = this.thyMustShowTime;
        this.panelMode = this.isRange ? [this.thyMode, this.thyMode] : this.thyMode;
        this.showWeek = this.thyMode === 'week';
        if (!this.thyFormat) {
            const inputFormats: { [key in PanelMode]?: string } = {
                year: 'yyyy',
                month: 'yyyy-MM',
                week: 'yyyy-ww',
                date: this.thyShowTime ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'
            };
            this.thyFormat = inputFormats[this.thyMode];
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
    }
}
