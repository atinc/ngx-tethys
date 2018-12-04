import { Component, OnInit, ViewChild, ElementRef, Renderer2, ViewContainerRef, ComponentRef, HostBinding } from '@angular/core';
import { BsDaterangepickerContainerComponent } from 'ngx-bootstrap/datepicker/themes/bs/bs-daterangepicker-container.component';
import { ComponentLoaderFactory, ComponentLoader } from 'ngx-bootstrap/component-loader';
import { BsDatepickerStore } from 'ngx-bootstrap/datepicker/reducer/bs-datepicker.store';
import { DatepickerValueEntry } from './i.datepicker';
import { ThyDaterangepickerConfig } from './daterangepicker.config';
import { ThyDatepickerConfig } from './datepicker.config';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
    selector: 'thy-daterangepicker-container',
    templateUrl: './daterangepicker-container.component.html'
})
export class ThyDaterangepickerContainerComponent implements OnInit {
    public initialState: any;
    public store: any;
    hideLoader: Function;
    value: Date[];
    // isShowTime = false;
    // isCanTime = false;
    isMeridian = false;
    @ViewChild('dpContainer')
    private _dpContainerRef: any;
    private _datepicker: ComponentLoader<BsDaterangepickerContainerComponent>;
    private _datepickerRef: ComponentRef<BsDaterangepickerContainerComponent>;

    constructor(
        private cis: ComponentLoaderFactory,
        private _store: BsDatepickerStore,
        public _config: ThyDaterangepickerConfig,
        _elementRef: ElementRef,
        _renderer: Renderer2,
        _viewContainerRef: ViewContainerRef,
    ) {
        this._datepicker = cis.createLoader<BsDaterangepickerContainerComponent>(
            _elementRef,
            _viewContainerRef,
            _renderer
        );
    }
    // 开始时间默认0:0 结束时间默认23:59，所以屏蔽掉了时间相关
    ngOnInit() {
        this.store = this.initialState.store;
        // this._initTimeShowMode();
        this._initDataValue();
        this._initDatepickerComponent();
    }

    // onTimeOk() {
    //     this._sendChangeValueEvent();
    // }

    // onClear() {
    //     this._sendChangeValueEvent([null,null]);
    // }

    hide() {
        this.hideLoader();
    }

    // changeTimeShowMode(type: string) {
    //     switch (type) {
    //         case 'can':
    //             this.isCanTime = true;
    //             this.isShowTime = false;
    //             break;
    //         case 'show':
    //             this.isCanTime = false;
    //             this.isShowTime = true;
    //             break;
    //     }
    // }

    private _sendChangeValueEvent(result?: Date[]) {
        if (result && result.length > 1) {
            this.store.value = result;
            // this.store.withTime = this.isShowTime;
            this.initialState.changeValue();
            this.hide();
        }

        // const nowDate = new Date();
        // const value = new Date(result.getFullYear(), result.getMonth(), result.getDate(),
        //     nowDate.getHours(), nowDate.getMinutes(), nowDate.getSeconds());
        // this.value = value;
        // this.onValueChange(value);
    }

    private _initDataValue() {
        this.value = this.store.value;
    }

    // private _initTimeShowMode() {
    //     if (this.store.originWithTime) {
    //         this.changeTimeShowMode('show');
    //     } else {
    //         if (this.store.withTime) {
    //             this.changeTimeShowMode('can');
    //         }
    //     }
    // }

    private _initDatepickerComponent() {
        this._datepickerRef = this._datepicker
            .provide({
                provide: BsDatepickerConfig, useValue: Object.assign({}, this._config, {
                    value: this.value,
                    containerClass: 'theme-ngx',
                    showWeekNumbers: false
                })
            })
            .attach(BsDaterangepickerContainerComponent)
            .to(this._dpContainerRef)
            .show();

        this._datepickerRef.instance.valueChange.subscribe((result: [Date]) => {
            this._sendChangeValueEvent(result);
        });
    }
}
