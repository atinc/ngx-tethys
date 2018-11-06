import {
    Directive, OnInit, ElementRef, Renderer2, ViewContainerRef,
    Input, ComponentRef, Output, EventEmitter, forwardRef, OnChanges, AfterContentInit
} from '@angular/core';
import { ComponentLoaderFactory, ComponentLoader } from 'ngx-bootstrap/component-loader';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeZhHans from '@angular/common/locales/zh-Hans';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isObject, isNumber, isDate, inputValueToBoolean } from '../util/helpers';
import { ThyPositioningService, PlacementTypes } from '../positioning/positioning.service';
import { DatepickerNextValueInfo } from './datepicker-next.interface';

const FORMAT_RULES = {
    default: 'yyyy-MM-dd',
    short: 'yyyy-MM-dd',
    full: 'yyyy-MM-dd HH:mm',
};

@Directive({
    selector: '[thyDatepickerNext]',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ThyDatepickerNextDirective),
        multi: true
    }]
})
export class ThyDatepickerNextDirective implements OnInit, AfterContentInit, ControlValueAccessor {
    dataPipe = new DatePipe('zh-Hans');
    private _format: string;
    private _onChange = Function.prototype;
    private _onTouched = Function.prototype;
    @Input() thyPlacement: PlacementTypes = PlacementTypes.bottom;
    @Input() thyAutoAdapt = true;
    @Input() thyTriggers = 'click';
    @Input() thyContainer = 'body';
    @Input() thyOutsideClick = true;
    @Input() thyDisabled = false;
    @Input() thyShowTime = false;
    @Input() thyFormat: string = null;

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        _viewContainerRef: ViewContainerRef,
        cis: ComponentLoaderFactory,
        private thyPositioningService: ThyPositioningService,

    ) {
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
    }

    writeValue(value: DatepickerNextValueInfo | Date | number) {

    }

    registerOnChange(fn: (value: any) => any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => any): void {
        this._onTouched = fn;
    }

    show() {

    }

    hide() {

    }


}
