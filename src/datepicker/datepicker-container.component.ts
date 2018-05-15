import { Component, OnInit, ViewChild, ElementRef, Renderer2, ViewContainerRef, ComponentRef, HostBinding } from '@angular/core';
import { BsDatepickerContainerComponent } from 'ngx-bootstrap/datepicker/themes/bs/bs-datepicker-container.component';
import { ComponentLoaderFactory, ComponentLoader } from 'ngx-bootstrap/component-loader';
import { BsDatepickerStore } from 'ngx-bootstrap/datepicker/reducer/bs-datepicker.store';

import { ThyDatepickerConfig } from './datepicker.config';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatepickerValueEntry } from './i.datepicker';

@Component({
    selector: 'thy-datepicker-container',
    templateUrl: './datepicker-container.component.html'
})
export class ThyDatepickerContainerComponent implements OnInit {

    hideLoader: Function;

    public initialState: any;

    value: Date;

    isShowTime = false;

    isMeridian = false;

    @ViewChild('dpContainer')
    private dpContainerRef: any;

    private _datepicker: ComponentLoader<BsDatepickerContainerComponent>;

    private _datepickerRef: ComponentRef<BsDatepickerContainerComponent>;

    @HostBinding('class.thy-datepicker-container--has-time') _isHasTime = false;

    constructor(
        private cis: ComponentLoaderFactory,
        private _store: BsDatepickerStore,
        public _config: BsDatepickerConfig,
        _elementRef: ElementRef,
        _renderer: Renderer2,
        _viewContainerRef: ViewContainerRef,
    ) {
        this._datepicker = cis.createLoader<BsDatepickerContainerComponent>(
            _elementRef,
            _viewContainerRef,
            _renderer
        );
    }

    ngOnInit() {
        this._initData();
        this._initDatepickerComponent();
    }

    onValueChange(value: Date): void {
        if (!this.isShowTime) {
            this._sendChangeValueEvent();
        }
    }

    onTimeOk() {
        this._sendChangeValueEvent();
    }

    onClear() {
        this._sendChangeValueEvent({
            date: '',
            with_time: this.initialState.value.with_time
        });
    }

    hide() {
        this.hideLoader();
    }

    private _sendChangeValueEvent(value?: DatepickerValueEntry) {
        if (value !== undefined) {
            this.initialState.changeValue(value);
        } else {
            this.initialState.changeValue({
                date: this.value,
                with_time: this.initialState.value.with_time
            });
        }
        this.hide();
    }

    private _initData() {
        this.isShowTime = this.initialState.value.with_time;
        this._isHasTime = this.isShowTime;
        this.value = new Date(this.initialState.value.date.getTime());
    }

    private _initDatepickerComponent() {
        this._datepickerRef = this._datepicker
            .provide({
                provide: BsDatepickerConfig, useValue: Object.assign({}, this._config, {
                    value: this.value,
                    containerClass: 'theme-ngx',
                    showWeekNumbers: false
                })
            })
            .attach(BsDatepickerContainerComponent)
            .to(this.dpContainerRef)
            .show();

        this._datepickerRef.instance.valueChange.subscribe((value: Date) => {
            this.value = value;
            this.onValueChange(value);
        });
    }
}
