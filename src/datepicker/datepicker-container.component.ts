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

    public initialState: any;
    hideLoader: Function;
    value: Date;
    isShowTime = false;
    isCanTime = false;
    isMeridian = false;
    @ViewChild('dpContainer')
    private dpContainerRef: any;
    private _datepicker: ComponentLoader<BsDatepickerContainerComponent>;
    private _datepickerRef: ComponentRef<BsDatepickerContainerComponent>;
    // @HostBinding('class.thy-datepicker-container--has-time') isShowTime = false;
    // @HostBinding('class.thy-datepicker-container--can-time') isCanTime = false;

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
        this._initTimeShowMode();
        this._initDataValue();
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

    changeTimeShowMode(type: string) {
        switch (type) {
            case 'clear':
                this.isCanTime = false;
                this.isShowTime = false;
                break;
            case 'can':
                this.isCanTime = true;
                this.isShowTime = false;
                break;
            case 'show':
                this.isCanTime = false;
                this.isShowTime = true;
                break;
        }
    }

    private _sendChangeValueEvent(value?: DatepickerValueEntry) {
        if (value !== undefined) {
            this.initialState.changeValue(value);
        } else {
            this.initialState.changeValue({
                date: this.value,
                with_time: this.isShowTime
            });
        }
        this.hide();
    }

    private _initDataValue() {
        this.value = new Date(this.initialState.value.date.getTime());
    }

    private _initTimeShowMode() {
        if (this.initialState.value.with_time) {
            this.changeTimeShowMode('show');
        } else {
            if (this.initialState.withTime) {
                this.changeTimeShowMode('can');
            }
        }
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
