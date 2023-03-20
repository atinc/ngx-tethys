import {
    AbstractControlValueAccessor,
    Constructor,
    InputBoolean,
    mixinDisabled,
    mixinTabIndex,
    ThyCanDisable,
    ThyHasTabIndex
} from 'ngx-tethys/core';
import { coerceBooleanProperty, TinyDate, helpers } from 'ngx-tethys/util';
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
    ThyDateRangeEntry,
    ThyPanelMode,
    ThyShortcutPosition,
    ThyShortcutPreset,
    ThyShortcutValueChange,
    ThyDateGranularity
} from './standard-types';

const _MixinBase: Constructor<ThyHasTabIndex> & Constructor<ThyCanDisable> & typeof AbstractControlValueAccessor = mixinTabIndex(
    mixinDisabled(AbstractControlValueAccessor)
);

/**
 * 日期选择的抽象组件
 * @order 10
 */
@Directive()
export abstract class AbstractPickerComponent extends _MixinBase implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
    thyValue: CompatibleValue | null;

    /**
     * 模式
     * @type decade | year | month | date | week | flexible
     */
    @Input() thyMode: ThyPanelMode = 'date';

    /**
     * 是否显示清除按钮
     * @type boolean
     */
    @Input() @InputBoolean() thyAllowClear = true;

    /**
     * 自动获取焦点
     * @type boolean
     */
    @Input() @InputBoolean() thyAutoFocus = false;

    @Input() @InputBoolean() thyOpen: boolean;

    @Input() thyDisabledDate: DisabledDateFn;

    /**
     * 最小值
     */
    @Input() thyMinDate: Date | number;

    /**
     * 最大值
     */
    @Input() thyMaxDate: Date | number;

    /**
     * 输入框提示文字
     */
    @Input() thyPlaceHolder: string | string[];

    /**
     * 是否只读
     * @default false
     */
    @Input() @InputBoolean() thyReadonly: boolean;

    /**
     * 选择器 className
     */
    @Input() thyOriginClassName: string;

    /**
     * 弹出层 className
     */
    @Input() thyPanelClassName: string;

    /**
     * 输入框的大小
     * @type xs | sm | md | lg | default
     */
    @Input() thySize: 'lg' | 'md' | 'sm' | 'xs' | 'default' = 'default';

    /**
     * 展示的日期格式
     * @default yyyy-MM-dd
     */
    @Input() thyFormat: string;

    /**
     * 是否取值开始日期的00:00以及截止日期的24:00
     * @description.en-us only for range picker, Whether to automatically take the beginning and ending unixTime of the day
     */
    @Input() @InputBoolean() thyAutoStartAndEnd = false;

    /**
     * 面板默认日期
     */
    @Input() thyDefaultPickerValue: CompatibleDate | number | null = null;

    /**
     * 自定义的后缀图标
     */
    @Input() thySuffixIcon = 'calendar';

    @Input() @InputBoolean() thyShowShortcut: boolean = false;

    @Input() set thyShortcutPosition(position: ThyShortcutPosition) {
        if (!!position) {
            this.shortcutPosition = position;
        }
    }

    @Input() set thyShortcutPresets(presets: ThyShortcutPreset[]) {
        if (presets && helpers.isArray(presets)) {
            this.shortcutPresets = [...presets];
        }
    }

    @Output() readonly thyShortcutValueChange = new EventEmitter<ThyShortcutValueChange>();

    @Output() readonly thyOpenChange = new EventEmitter<boolean>();

    @ViewChild(ThyPickerComponent, { static: true }) public picker: ThyPickerComponent;

    /**
     * 是否禁用
     * @default false
     */
    @Input()
    @InputBoolean()
    get thyDisabled(): boolean {
        return this.disabled;
    }
    set thyDisabled(value: boolean) {
        this.disabled = coerceBooleanProperty(value);
    }

    disabled = false;

    shortcutPosition: ThyShortcutPosition = 'left';

    shortcutPresets: ThyShortcutPreset[];

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
