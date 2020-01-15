import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    TemplateRef
} from '@angular/core';

import { CandyDate } from '../core';
import { toBoolean, FunctionProp } from '../util/helpers';

import { AbstractPickerComponent } from './abstract-picker.component';
import { CompatibleDate, PanelMode, CompatibleValue } from './standard-types';

@Component({
    template: ``
})
export class BasePickerComponent extends AbstractPickerComponent implements OnInit, OnChanges {
    showWeek = false;

    @Input() thyDateRender: FunctionProp<TemplateRef<Date> | string>;
    @Input() thyMode: PanelMode | PanelMode[];

    @Output() readonly thyOnPanelChange = new EventEmitter<PanelMode | PanelMode[]>();
    @Output() readonly thyOnCalendarChange = new EventEmitter<Date[]>();

    private _showTime: object | boolean;
    @Input() get thyShowTime(): object | boolean {
        return this._showTime;
    }
    set thyShowTime(value: object | boolean) {
        this._showTime = typeof value === 'object' ? value : toBoolean(value);
    }

    @Input() thyMustShowTime = false;

    @Output() readonly thyOnOk = new EventEmitter<CompatibleDate | null>();

    constructor(cdr: ChangeDetectorRef) {
        super(cdr);
    }

    ngOnInit(): void {
        super.ngOnInit();

        if (!this.thyFormat) {
            if (this.showWeek) {
                this.thyFormat = 'yyyy-ww';
            } else {
                this.thyFormat = this.thyShowTime ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd';
            }
        }
        this.setDefaultTimePickerState();
    }

    onValueChange(value: CompatibleValue): void {
        super.onValueChange(value);

        this.restoreTimePickerState(value);
        this.closeOverlay();
    }

    // Displays the time directly when the time must be displayed by default
    setDefaultTimePickerState() {
        this.withTime = this.thyMustShowTime;
    }

    // Restore after clearing time to select whether the original picker time is displayed or not
    restoreTimePickerState(value: CompatibleValue | null) {
        if (!value) {
            this.withTime = this.thyMustShowTime;
        }
    }

    // Emit thyOnCalendarChange when select date by thy-range-picker
    onCalendarChange(value: CandyDate[]): void {
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
            const value = this.thyValue as CandyDate[];
            if (value.length) {
                this.thyOnOk.emit([value[0].nativeDate, value[1].nativeDate]);
            } else {
                this.thyOnOk.emit([]);
            }
        } else {
            if (this.thyValue) {
                this.thyOnOk.emit((this.thyValue as CandyDate).nativeDate);
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
