import { InputBoolean, TabIndexMixinBase } from 'ngx-tethys/core';
import { coerceBooleanProperty, TinyDate } from 'ngx-tethys/util';
import { Subject } from 'rxjs';

import {
    ChangeDetectorRef,
    Directive,
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

import { CompatibleValue, RangeAdvancedValue } from './inner-types';
import { ThyPickerComponent } from './picker.component';
import { makeValue, transformDateValue } from './picker.util';
import {
    CompatibleDate,
    DateEntry,
    DisabledDateFn,
    ThyDateGranularity,
    ThyDateRangeEntry,
    ThyPanelMode,
    ThyShortcutPosition,
    ThyShortcutRange,
    ThyShortcutValueChange
} from './standard-types';

@Directive()
export abstract class AbstractPickerComponent extends TabIndexMixinBase implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
    thyValue: CompatibleValue | null;
    @Input() thyMode: ThyPanelMode = 'date';
    @Input() @InputBoolean() thyAllowClear = true;
    @Input() @InputBoolean() thyAutoFocus = false;
    @Input() @InputBoolean() thyOpen: boolean;
    @Input() thyDisabledDate: DisabledDateFn;
    @Input() thyMinDate: Date | number;
    @Input() thyMaxDate: Date | number;
    @Input() thyPlaceHolder: string | string[];
    @Input() @InputBoolean() thyReadonly: boolean;
    @Input() thyOriginClassName: string;
    @Input() thyPanelClassName: string;
    @Input() thySize: 'lg' | 'md' | 'sm' | 'xs' | 'default' = 'default';
    @Input() thyFormat: string;
    // eslint-disable-next-line max-len
    @Input() thyAutoStartAndEnd = false; // only for range picker, Whether to automatically take the beginning and ending unixTime of the day
    @Input() thyDefaultPickerValue: CompatibleDate | number | null = null;
    @Input() thySuffixIcon = 'calendar';

    @Output() readonly thyShortcutValueChange = new EventEmitter<ThyShortcutValueChange>();

    @Output() readonly thyOpenChange = new EventEmitter<boolean>();

    @ViewChild(ThyPickerComponent, { static: true }) public picker: ThyPickerComponent;

    @Input()
    // eslint-disable-next-line prettier/prettier
    override get thyDisabled(): boolean {
      return this.disabled;
    }
    override set thyDisabled(value: boolean) {
        this.disabled = coerceBooleanProperty(value);
    }

    disabled = false

    shortcutPosition: ThyShortcutPosition;

    shortcutRanges: ThyShortcutRange[];

    thyShowShortcut: boolean;

    isRange: boolean;

    withTime: boolean;

    flexible: boolean;

    flexibleDateGranularity: ThyDateGranularity;

    protected destroyed$: Subject<void> = new Subject();
    protected isCustomPlaceHolder = false;
    private onlyEmitDate = false;
    protected originWithTime: boolean;

    get realOpenState(): boolean {
        return this.picker.realOpenState;
    }

    initValue(): void {
        this.thyValue = this.isRange ? [] : null;
    }

    constructor(public cdr: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        this.setDefaultPlaceHolder();
        this.initValue();
        this.isFlexible();
    }

    isFlexible() {
        this.flexible = this.thyMode === 'flexible';
    }

    onShortcutValueChange(event: ThyShortcutValueChange) {
        this.thyShortcutValueChange.emit(event);
        this.closeOverlay();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thyPlaceHolder && changes.thyPlaceHolder.firstChange && typeof this.thyPlaceHolder !== 'undefined') {
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

    getAutoStartAndEndValue(begin: TinyDate, end: TinyDate) {
        let value: { begin: number; end: number };
        switch (this.thyMode) {
            case 'date':
                value = {
                    begin: begin.startOfDay().getUnixTime(),
                    end: end.endOfDay().getUnixTime()
                };
                break;
            case 'week':
                value = {
                    begin: begin.startOfWeek().getUnixTime(),
                    end: end.endOfWeek().getUnixTime()
                };
                break;
            case 'month':
                value = {
                    begin: begin.startOfMonth().getUnixTime(),
                    end: end.endOfMonth().getUnixTime()
                };
                break;
            case 'year':
                value = {
                    begin: begin.startOfYear().getUnixTime(),
                    end: end.endOfYear().getUnixTime()
                };
                break;
            default:
                value = {
                    begin: begin.startOfDay().getUnixTime(),
                    end: end.endOfDay().getUnixTime()
                };
                break;
        }
        return value;
    }

    onValueChange(originalValue: CompatibleValue | RangeAdvancedValue): void {
        this.setFormatRule();
        const { value, withTime, flexibleDateGranularity } = transformDateValue(originalValue);
        this.flexibleDateGranularity = flexibleDateGranularity;
        this.setValue(value);
        if (this.isRange) {
            const vAsRange: any = this.thyValue;
            let value = { begin: null, end: null } as ThyDateRangeEntry;
            if (vAsRange.length) {
                const [begin, end] = vAsRange as TinyDate[];
                if (this.thyAutoStartAndEnd) {
                    value = this.getAutoStartAndEndValue(begin, end);
                } else {
                    value = {
                        begin: begin.getUnixTime(),
                        end: end.getUnixTime()
                    };
                }
            }
            if (this.flexible) {
                value.granularity = flexibleDateGranularity;
            }
            this.onChangeFn(value);
        } else {
            const value = { date: null, with_time: this.withTime ? 1 : 0 } as DateEntry;
            if (this.thyValue) {
                value.date = (this.thyValue as TinyDate).getUnixTime();
            }
            if (this.onlyEmitDate) {
                this.onChangeFn(value.date);
            } else {
                this.onChangeFn(value);
            }
        }
        this.onTouchedFn();
    }

    setFormatRule() {
        if (!this.thyFormat) {
            if (this.withTime) {
                this.thyFormat = 'yyyy-MM-dd HH:mm';
            } else {
                if (!this.onlyEmitDate) {
                    this.thyFormat = 'yyyy-MM-dd';
                }
            }
        }
    }

    onOpenChange(open: boolean): void {
        this.thyOpen = open;
        this.thyOpenChange.emit(open);
    }

    onChangeFn: (val: CompatibleDate | DateEntry | ThyDateRangeEntry | number | null) => void = () => void 0;
    onTouchedFn: () => void = () => void 0;

    writeValue(originalValue: CompatibleDate | ThyDateRangeEntry): void {
        const { value, withTime, flexibleDateGranularity } = transformDateValue(originalValue);
        this.flexibleDateGranularity = flexibleDateGranularity;
        if (this.flexible && value && (value as Date[]).length) {
            if (!this.flexibleDateGranularity) {
                this.flexibleDateGranularity = 'day';
            }
        }

        this.setValue(value);
        this.setTimePickerState(withTime);
        this.onlyEmitDate = typeof withTime === 'undefined';
        this.originWithTime = withTime;
        this.setFormatRule();
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
        this.thyValue = makeValue(value, this.isRange);
    }
}
