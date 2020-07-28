import {
    Directive,
    OnInit,
    ElementRef,
    Renderer2,
    ViewContainerRef,
    Input,
    ComponentRef,
    Output,
    EventEmitter,
    forwardRef,
    OnChanges,
    AfterContentInit,
    HostBinding
} from '@angular/core';
import { ComponentLoaderFactory, ComponentLoader } from 'ngx-bootstrap/component-loader';
import { DatepickerValueEntry, DatepickerValueShowTypesEnum, DatepickerFormatRules } from './i.datepicker';
import { ThyDatepickerService } from './datepicker.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isObject, isNumber, isDate, coerceBooleanProperty } from '../util/helpers';
import { daterangepickerUtilIdentificationValueType, daterangepickerUtilConvertToDaterangepickerObject } from './util';
import { ThyDaterangepickerContainerComponent } from './daterangepicker-container.component';
import { ThyPositioningService } from '../positioning/positioning.service';
import { ThyDaterangepickerConfig } from './daterangepicker.config';
import { warnDeprecation } from '../core/logger';

const DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ThyDaterangepickerDirective),
    multi: true
};

@Directive({
    selector: '[thyDaterangepicker]',
    providers: [DATEPICKER_VALUE_ACCESSOR]
})
export class ThyDaterangepickerDirective implements OnInit, AfterContentInit, ControlValueAccessor {
    private _value: DatepickerValueEntry | number | Date | any;
    private _showFormatRule: string; // 日期格式化
    private _onChange = Function.prototype;
    private _onTouched = Function.prototype;
    private _isAfterContentInit = false;
    private _loader: ComponentLoader<ThyDaterangepickerContainerComponent>;
    private _valueType: DatepickerValueShowTypesEnum;
    private _isFirstShowInputProperty = true;
    private store: {
        originValue?: any;
        originValueType?: any;
        // originWithTime?: boolean,
        value?: any;
        // withTime?: boolean,
    } = {};
    @Input() thyPlacement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
    @Input() thyTriggers = 'click';
    @Input() thyContainer = 'body';
    @Input() thyOutsideClick = true;
    @Input() thyDisabled = false;
    @Input() thyShowTime = false;
    @Input() thyFormat: string = null;
    @Input() thyCustomValue = '';
    @Input() thyMinDate: Date;
    @Input() thyMaxDate: Date;
    // @Output() thyOnChange: EventEmitter<any> = new EventEmitter();
    @HostBinding('class.cursor-pointer')
    get isCursorPointerClass() {
        return !this.thyDisabled;
    }

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private _viewContainerRef: ViewContainerRef,
        private cis: ComponentLoaderFactory,
        private service: ThyDatepickerService,
        private thyPositioningService: ThyPositioningService,
        private _config: ThyDaterangepickerConfig
    ) {
        this._loader = cis.createLoader<ThyDaterangepickerContainerComponent>(_elementRef, _viewContainerRef, _renderer);
    }

    /**
     * @deprecated The ThyDaterangepicker will be deprecated, please use ThyRangePicker.
     */
    ngOnInit() {
        warnDeprecation(`The ThyDaterangepicker will be deprecated, please use ThyRangePicker.`);

        this._loader.listen({
            outsideClick: this.thyOutsideClick,
            triggers: this.thyTriggers,
            show: () => this.show(),
            hide: () => {
                this.hide();
            }
        });
    }

    ngAfterContentInit() {
        this._isAfterContentInit = true;
    }

    writeValue(value: DatepickerValueEntry | Date | number) {
        if (this._isAfterContentInit) {
            this.initValueData(value);
            this._initFormatRule();
            this._setInputProperty();
        }
    }

    registerOnChange(fn: (value: any) => any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => any): void {
        this._onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
        this.thyDisabled = isDisabled;
    }

    show() {
        if (this.thyDisabled) {
            return;
        }

        this.service.initLocale();

        const dateRangeContainerRef = this._loader
            .attach(ThyDaterangepickerContainerComponent)
            .to(this.thyContainer)
            .show({
                hideLoader: () => {
                    this.hide();
                },
                initialState: {
                    store: this.store,
                    value: this._value,
                    // withTime: coerceBooleanProperty(this.thyShowTime),
                    changeValue: (result: DatepickerValueEntry) => {
                        this._initFormatRule();
                        this._setInputProperty();
                        this._sendValueToNgModel();
                    }
                }
            });

        this._renderer.addClass(this._elementRef.nativeElement, this._config.openedClass);
        this.thyPositioningService.setPosition({
            target: dateRangeContainerRef.location,
            attach: this._elementRef,
            placement: this.thyPlacement,
            offset: 2,
            appendToBody: true
        });
    }

    hide() {
        this._renderer.removeClass(this._elementRef.nativeElement, this._config.openedClass);
        this._loader.hide();
    }

    private initValueData(value: any, isRefreshType?: boolean) {
        this.store.originValue = value;
        this.store.originValueType = daterangepickerUtilIdentificationValueType(value);
        // this.store.originWithTime = value && value.begin && value.begin.with_time;
        // this.store.withTime = coerceBooleanProperty(this.thyShowTime);
        this.store.value = daterangepickerUtilConvertToDaterangepickerObject(value);
    }

    private _initFormatRule() {
        if (this.thyFormat) {
            this._showFormatRule = this.thyFormat;
        } else {
            // if (this.store.withTime) {
            //     this._showFormatRule = DatepickerFormatRules.full;
            // } else {
            //     this._showFormatRule = DatepickerFormatRules.short;
            // }
            this._showFormatRule = DatepickerFormatRules.short;
        }
    }

    private _setInputProperty() {
        let initialDate =
            this.service.dataPipe.transform(this.store.value[0], this._showFormatRule) +
            ' ~ ' +
            this.service.dataPipe.transform(this.store.value[1], this._showFormatRule);

        if (this.store.value[0] == null || this.store.value[1] == null) {
            initialDate = '';
        }

        this._renderer.setProperty(this._elementRef.nativeElement, 'value', this.thyCustomValue ? this.thyCustomValue : initialDate);
    }

    private _formatBeginTime(begin?: Date): number {
        if (begin) {
            const beginDate = new Date(begin.getFullYear(), begin.getMonth(), begin.getDate());
            return Math.floor(beginDate.getTime() / 1000);
        }
        return 0;
    }

    private _formatEndTime(end?: Date): number {
        if (end) {
            const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59);
            return Math.floor(endDate.getTime() / 1000);
        }
        return 0;
    }

    private _sendValueToNgModel() {
        let result;
        switch (this.store.originValueType) {
            case DatepickerValueShowTypesEnum.daterangepickerTime:
                result = {
                    begin: this._formatBeginTime(this.store.value[0]),
                    end: this._formatEndTime(this.store.value[1])
                };
                break;
            case DatepickerValueShowTypesEnum.daterangepickerTimeObject:
                result = {
                    begin: {
                        date: this._formatBeginTime(this.store.value[0])
                        // with_time: this.store.withTime
                    },
                    end: {
                        date: this._formatEndTime(this.store.value[1])
                        // with_time: this.store.withTime
                    }
                };
                break;
            default:
                result = {
                    begin: this._formatBeginTime(this.store.value[0]),
                    end: this._formatEndTime(this.store.value[1])
                };
                break;
        }
        this._onChange(result);
    }
}
