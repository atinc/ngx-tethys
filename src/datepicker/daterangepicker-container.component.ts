import { Component, OnInit, ViewChild, ElementRef, Renderer2, ViewContainerRef, ComponentRef } from '@angular/core';
import { ThyDaterangepickerConfig } from './daterangepicker.config';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { skip } from 'rxjs/operators';

@Component({
    selector: 'thy-daterangepicker-container',
    templateUrl: './daterangepicker-container.component.html',
    providers: [BsDatepickerConfig]
})
export class ThyDaterangepickerContainerComponent implements OnInit {
    public initialState: any;
    public store: any;
    hideLoader: Function;
    value: Date[];
    isMeridian = false;

    @ViewChild('dpContainer', { static: true })
    private _dpContainerRef: any;

    constructor(
        public _config: ThyDaterangepickerConfig,
        public _bsConfig: BsDatepickerConfig,
        _elementRef: ElementRef,
        _renderer: Renderer2,
        _viewContainerRef: ViewContainerRef
    ) {
        _bsConfig.containerClass = 'theme-ngx';
        _bsConfig.showWeekNumbers = false;
        _bsConfig.displayMonths = 2;
    }

    // 开始时间默认0:0 结束时间默认23:59，所以屏蔽掉了时间相关
    ngOnInit() {
        this.store = this.initialState.store;
        this._initDataValue();
    }

    hide() {
        this.hideLoader();
    }

    private _sendChangeValueEvent(result?: Date[]) {
        if (result && result.length > 1) {
            this.store.value = result;
            this.initialState.changeValue();
            this.hide();
        }
    }

    private _initDataValue() {
        this.value = this.store.value;
        this._dpContainerRef._effects.init(this._dpContainerRef._store);
        this._dpContainerRef._effects.setRangeValue(this.value);
        this._dpContainerRef.valueChange.pipe(skip(1)).subscribe((result: [Date]) => {
            this._sendChangeValueEvent(result);
        });
    }
}
