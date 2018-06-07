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
    private _valueState = {
        hasTime: false
    };
    private _valueInitialState = {  // 初始化value的状态
        hasTime: false,     // 是否显示时间，清除时候需要用
        valueType: DatepickerValueShowTypesEnum     // 值的类型，用于输出与输入相同类型
    };
    @Input() thyPlacement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
    @Input() thyTriggers = 'click';
    @Input() thyContainer = 'body';
    @Input() thyOutsideClick = true;
    @Input() thyDisabled = false;
    @Input() thyShowTime = false;
    @Input() thyFormat: string = null;
    @Output() thyOnChange: EventEmitter<any> = new EventEmitter();

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
        this.service.storeType = 'range';
        if (this._isAfterContentInit) {
            this.service.initValueData(value);
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
                    value: this._value,
                    valueInitialState: this._valueInitialState,
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

    private _initValueState() {
        this._valueInitialState.hasTime = this._value && this._value[0] && this._value[0].with_time;
    }

    private _initFormatRule() {
        if (this.thyFormat) {
            this._showFormatRule = this.thyFormat;
        } else {
            if (this.service.store.withTime) {
                this._showFormatRule = DatepickerFormatRules.full;
            } else {
                this._showFormatRule = DatepickerFormatRules.short;
            }
        }
    }

    private _setInputProperty() {
        const initialDate = this.service.dataPipe.transform(this.service.store.value[0], this._showFormatRule)
            + ' ~ '
            + this.service.dataPipe.transform(this.service.store.value[1], this._showFormatRule);
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', initialDate);
    }

    private _sendValueToNgModel() {
        let result;
        switch (this.service.store.originValueType) {
            case DatepickerValueShowTypesEnum.daterangepickerTimeObject:
                result = {
                    begin: {
                        date: this.service.store.value[0].getTime() / 1000,
                        with_time: this.service.store.withTime
                    },
                    end: {
                        date: this.service.store.value[1].getTime() / 1000,
                        with_time: this.service.store.withTime
                    }
                };
                break;
            default:
                result = { begin: {}, end: {} };
                break;
        }
        this._onChange(result);
    }

}
