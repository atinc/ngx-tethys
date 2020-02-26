import {
    ChangeDetectorRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';

import { InputBoolean } from '../core';
import { CandyDate } from '../util';

import { ThyPickerComponent } from './picker.component';
import { CompatibleDate, CompatibleValue, DisabledDateFn, DateEntry, RangeEntry } from './standard-types';
import { transformDateValue } from './picker.util';

export abstract class AbstractPickerComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
    thyValue: CompatibleValue | null;
    @Input() @InputBoolean() thyAllowClear = true;
    @Input() @InputBoolean() thyAutoFocus = false;
    @Input() @InputBoolean() thyDisabled = false;
    @Input() @InputBoolean() thyOpen: boolean;
    @Input() thyDisabledDate: (d: Date) => boolean;
    @Input() thyMinDate: Date;
    @Input() thyMaxDate: Date;
    @Input() thyPlaceHolder: string | string[];
    @Input() @InputBoolean() thyReadonly: boolean;
    @Input() thyOriginClassName: string;
    @Input() thyPanelClassName: string;
    @Input() thySize: 'lg' | 'md' | 'sm' | 'xs';
    @Input() thyFormat: string;
    // tslint:disable-next-line: max-line-length
    @Input() thyAutoStartAndEnd = false; // only for range picker, Whether to automatically take the beginning and ending unixTime of the day

    @Output() readonly thyOpenChange = new EventEmitter<boolean>();

    @ViewChild(ThyPickerComponent) public picker: ThyPickerComponent;

    isRange = false;

    withTime: boolean;

    protected destroyed$: Subject<void> = new Subject();
    protected isCustomPlaceHolder = false;

    get realOpenState(): boolean {
        return this.picker.realOpenState;
    }

    initValue(): void {
        this.thyValue = this.isRange ? [] : null;
    }

    initDisabledDate(): void {
        let minDate: CandyDate;
        let maxDate: CandyDate;
        let disabledDateFn: DisabledDateFn;
        if (this.thyMinDate) {
            minDate = new CandyDate(this.thyMinDate);
        }
        if (this.thyMaxDate) {
            maxDate = new CandyDate(this.thyMaxDate);
        }
        if (this.thyDisabledDate) {
            disabledDateFn = this.thyDisabledDate;
        }
        this.thyDisabledDate = d => {
            let expression = false;
            if (minDate) {
                expression = d < minDate.nativeDate;
            }
            if (maxDate && !expression) {
                expression = d > maxDate.nativeDate;
            }
            if (disabledDateFn && typeof disabledDateFn === 'function' && !expression) {
                expression = disabledDateFn(d);
            }
            return expression;
        };
    }

    constructor(public cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.setDefaultPlaceHolder();
        this.initValue();
        this.initDisabledDate();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes.thyPlaceHolder &&
            changes.thyPlaceHolder.firstChange &&
            typeof this.thyPlaceHolder !== 'undefined'
        ) {
            this.isCustomPlaceHolder = true;
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    closeOverlay(): void {
        this.picker.hideOverlay();
    }

    onValueChange(originalValue: CompatibleValue): void {
        this.thyValue = originalValue;
        if (this.isRange) {
            const vAsRange: any = this.thyValue;
            let value = { begin: null, end: null } as RangeEntry;
            if (vAsRange.length) {
                const [begin, end] = vAsRange as CandyDate[];
                if (this.thyAutoStartAndEnd) {
                    value = {
                        begin: begin.startOfDay().getUnixTime(),
                        end: end.endOfDay().getUnixTime()
                    };
                } else {
                    value = {
                        begin: begin.getUnixTime(),
                        end: end.getUnixTime()
                    };
                }
            }
            this.onChangeFn(value);
        } else {
            const value = { date: null, with_time: this.withTime ? 1 : 0 } as DateEntry;
            if (this.thyValue) {
                value.date = (this.thyValue as CandyDate).getUnixTime();
            }
            this.onChangeFn(value);
        }
        this.onTouchedFn();
    }

    onOpenChange(open: boolean): void {
        this.thyOpen = open;
        this.thyOpenChange.emit(open);
    }

    onChangeFn: (val: CompatibleDate | DateEntry | RangeEntry | null) => void = () => void 0;
    onTouchedFn: () => void = () => void 0;

    writeValue(originalValue: CompatibleDate): void {
        const { value, withTime } = transformDateValue(originalValue);
        this.setValue(value);
        this.setTimePickerState(withTime);
        this.cdr.markForCheck();
    }

    registerOnChange(fn: any): void {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedFn = fn;
    }

    setTimePickerState(withTime: boolean): void {
        this.withTime = withTime;
    }

    setDisabledState(disabled: boolean): void {
        this.thyDisabled = disabled;
        this.cdr.markForCheck();
    }

    private setDefaultPlaceHolder(): void {
        if (!this.isCustomPlaceHolder) {
            this.thyPlaceHolder = this.isRange ? ['开始日期', '结束日期'] : '请选择日期';
        }
        this.cdr.markForCheck();
    }

    public setValue(value: CompatibleDate): void {
        if (this.isRange) {
            (this.thyValue as any) = value ? (value as Date[]).map(val => new CandyDate(val)) : [];
        } else {
            (this.thyValue as any) = value ? new CandyDate(value as Date) : null;
        }
    }
}
