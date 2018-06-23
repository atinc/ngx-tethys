import {
    Directive, OnInit, ElementRef, Renderer2, ViewContainerRef,
    Input, ComponentRef, Output, EventEmitter, forwardRef, OnChanges, AfterContentInit
} from '@angular/core';
import { ComponentLoaderFactory, ComponentLoader } from 'ngx-bootstrap/component-loader';
import { DatepickerValueEntry, DatepickerValueShowTypesEnum, DatepickerFormatRules } from './i.datepicker';
import { ThyDatepickerService } from './datepicker.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isObject, isNumber, isDate, inputValueToBoolean } from '../util/helpers';
import { daterangepickerUtilIdentificationValueType, daterangepickerUtilConvertToDaterangepickerObject } from './util';
import { ThyDaterangepickerContainerComponent } from './daterangepicker-container.component';

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
    private _showFormatRule: string;    // 日期格式化
    private _onChange = Function.prototype;
    private _onTouched = Function.prototype;
    private _isAfterContentInit = false;
    private _loader: ComponentLoader<ThyDaterangepickerContainerComponent>;
    private _valueType: DatepickerValueShowTypesEnum;
    private _isFirstShowInputProperty = true;
    private store: {
        originValue?: any,
        originValueType?: any,
        originWithTime?: boolean,
        value?: any,
        withTime?: boolean,
    } = {};
    @Input() thyPlacement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
    @Input() thyTriggers = 'click';
    @Input() thyContainer = 'body';
    @Input() thyOutsideClick = true;
    @Input() thyDisabled = false;
    @Input() thyShowTime = false;
    @Input() thyFormat: string = null;
    // @Output() thyOnChange: EventEmitter<any> = new EventEmitter();

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private _viewContainerRef: ViewContainerRef,
        private cis: ComponentLoaderFactory,
        private service: ThyDatepickerService,
    ) {
        this._loader = cis.createLoader<ThyDaterangepickerContainerComponent>(
            _elementRef,
            _viewContainerRef,
            _renderer
        );
    }

    ngOnInit() {
        this._loader.listen({
            outsideClick: this.thyOutsideClick,
            triggers: this.thyTriggers,
            show: () => this.show()
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

    show() {
        if (this.thyDisabled) {
            return;
        }

        this.service.initLocale();

        this._loader.attach(ThyDaterangepickerContainerComponent)
            .to(this.thyContainer)
            .position({ attachment: this.thyPlacement })
            .show({
                hideLoader: () => {
                    this.hide();
                },
                initialState: {
                    store: this.store,
                    value: this._value,
                    withTime: inputValueToBoolean(this.thyShowTime),
                    changeValue: (result: DatepickerValueEntry) => {
                        this._initFormatRule();
                        this._setInputProperty();
                        this._sendValueToNgModel();
                    }
                }
            });
    }

    hide() {
        this._loader.hide();
    }

    private initValueData(value: any, isRefreshType?: boolean) {
        this.store.originValue = value;
        this.store.originValueType = daterangepickerUtilIdentificationValueType(value);
        this.store.originWithTime = value && value.begin && value.begin.with_time;
        this.store.withTime = inputValueToBoolean(this.thyShowTime);
        this.store.value = daterangepickerUtilConvertToDaterangepickerObject(value);
    }

    private _initFormatRule() {
        if (this.thyFormat) {
            this._showFormatRule = this.thyFormat;
        } else {
            if (this.store.withTime) {
                this._showFormatRule = DatepickerFormatRules.full;
            } else {
                this._showFormatRule = DatepickerFormatRules.short;
            }
        }
    }

    private _setInputProperty() {
        let initialDate = this.service.dataPipe.transform(this.store.value[0], this._showFormatRule)
            + ' ~ '
            + this.service.dataPipe.transform(this.store.value[1], this._showFormatRule);
        if (this._isFirstShowInputProperty &&
            (this.store.originValueType === DatepickerValueShowTypesEnum.daterangepickerNullValue
                || this.store.originValueType === DatepickerValueShowTypesEnum.daterangepickerNullValueObject)) {
            initialDate = '';
            this._isFirstShowInputProperty = false;
        }
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', initialDate);
    }

    private _sendValueToNgModel() {
        let result;
        switch (this.store.originValueType) {
            case DatepickerValueShowTypesEnum.daterangepickerTime:
                result = {
                    begin: this.store.value[0].getTime() / 1000,
                    end: this.store.value[1].getTime() / 1000
                };
                break;
            case DatepickerValueShowTypesEnum.daterangepickerTimeObject:
                result = {
                    begin: {
                        date: this.store.value[0].getTime() / 1000,
                        with_time: this.store.withTime
                    },
                    end: {
                        date: this.store.value[1].getTime() / 1000,
                        with_time: this.store.withTime
                    }
                };
                break;
            default:
                result = {
                    begin: this.store.value[0].getTime() / 1000,
                    end: this.store.value[1].getTime() / 1000
                };
                break;
        }
        this._onChange(result);
    }

}
