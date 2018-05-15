import {
    Directive, OnInit, ElementRef, Renderer2, ViewContainerRef,
    Input, ComponentRef, Output, EventEmitter, forwardRef
} from '@angular/core';
import { ComponentLoaderFactory, ComponentLoader } from 'ngx-bootstrap/component-loader';
import { ThyDatepickerContainerComponent } from './datepicker-container.component';
import { ThyDatepickerConfig } from './datepicker.config';
import { DatepickerValueEntry } from './i.datepicker';
import { ThyDatepickerService } from './datepicker.service';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeZhHans from '@angular/common/locales/zh-Hans';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isObject, isNumber, isDate, inputValueToBoolean } from '../util/helpers';
registerLocaleData(localeZhHans, 'zh-Hans');

const FORMAT_RULES = {
    default: 'yyyy-MM-dd',
    short: 'yyyy-MM-dd',
    full: 'yyyy-MM-dd HH:mm',
};

const DATEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ThyDatepickerDirective),
    multi: true
};

@Directive({
    selector: '[thyDatepicker]',
    providers: [DATEPICKER_VALUE_ACCESSOR]
})
export class ThyDatepickerDirective implements OnInit, ControlValueAccessor {
    dataPipe = new DatePipe('zh-Hans');
    private _value: DatepickerValueEntry;
    private _onChange = Function.prototype;
    private _onTouched = Function.prototype;
    private _loader: ComponentLoader<ThyDatepickerContainerComponent>;
    @Input() thyPlacement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
    @Input() thyTriggers = 'click';
    @Input() thyContainer = 'body';
    @Input() thyOutsideClick = true;
    @Input() thyDisabled = false;
    @Input() thyWithTime = false;
    @Input() thyFormat: string;
    @Output() thyOnChange: EventEmitter<any> = new EventEmitter();

    constructor(
        public _config: ThyDatepickerConfig,
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        _viewContainerRef: ViewContainerRef,
        cis: ComponentLoaderFactory,
        private datepickerService: ThyDatepickerService,
    ) {
        this._loader = cis.createLoader<ThyDatepickerContainerComponent>(
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

    writeValue(value: DatepickerValueEntry | Date | number) {
        if (value) {
            this._initValueDate(value);
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

        this.datepickerService.initLocale();

        this._loader.provide({ provide: ThyDatepickerConfig, useValue: this._config })
            .attach(ThyDatepickerContainerComponent)
            .to(this.thyContainer)
            .position({ attachment: this.thyPlacement })
            .show({
                hideLoader: () => {
                    this.hide();
                },
                initialState: {
                    withTime: inputValueToBoolean(this.thyWithTime),
                    value: this._value,
                    changeValue: (result: DatepickerValueEntry) => {
                        this._initFormatRule(result);
                        this._setInputProperty(result.date);
                        this._onChange(result);
                    }
                }
            });
    }

    hide() {
        this._loader.hide();
    }

    private _initValueDate(value: DatepickerValueEntry | Date | number | any) {
        if (isDate(value)) {
            this._value = {
                date: value,
                with_time: false
            };
        } else if (isObject(value)) {
            this._value = value;
        } else if (isNumber(value)) {
            if (value.toString().length === 10) {
                this._value = {
                    date: new Date(value * 1000),
                    with_time: false
                };
            } else {
                this._value = {
                    date: new Date(value),
                    with_time: false
                };
            }
        } else {
            this._value = {
                date: value,
                with_time: false
            };
        }
        this._initFormatRule();
        this._setInputProperty(this._value.date);

    }

    private _initFormatRule(value?: DatepickerValueEntry) {
        if (value) {
            if (value.with_time) {
                this.thyFormat = FORMAT_RULES.full;
            } else {
                this.thyFormat = FORMAT_RULES.short;
            }
        } else {
            if (!this.thyFormat) {
                if (this._value.with_time) {
                    this.thyFormat = FORMAT_RULES.full;
                } else {
                    this.thyFormat = FORMAT_RULES.short;
                }
            }
        }
    }

    private _setInputProperty(value: any) {
        const initialDate = !value ? '' : this.dataPipe.transform(value, this.thyFormat);
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', initialDate);
    }

}
