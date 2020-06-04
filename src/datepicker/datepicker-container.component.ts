import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { skip } from 'rxjs/operators';
import { DatepickerValueEntry } from './i.datepicker';

@Component({
    selector: 'thy-datepicker-container',
    templateUrl: './datepicker-container.component.html',
    providers: [BsDatepickerConfig]
})
export class ThyDatepickerContainerComponent implements OnInit {
    public initialState: any;
    hideLoader: Function;
    value: Date;
    maxDate: Date;
    minDate: Date;
    isShowTime = false;
    isCanTime = false;
    isMeridian = false;

    @ViewChild('dpContainer', { static: true })
    private _dpContainerRef: any;

    constructor(private _config: BsDatepickerConfig, _elementRef: ElementRef, _renderer: Renderer2, _viewContainerRef: ViewContainerRef) {
        this._config.containerClass = 'theme-ngx';
        this._config.showWeekNumbers = false;
    }

    ngOnInit() {
        this._initTimeShowMode();
        this._initDataValue();
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
            date: null,
            with_time: this.initialState.valueRef.with_time
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
        this.value = this.initialState.value.date
            ? new Date(this.initialState.value.date.getTime())
            : this.initialState.defaultDate || new Date();
        this._dpContainerRef._effects.init(this._dpContainerRef._store);
        this._dpContainerRef._effects.setValue(this.value);
        this._dpContainerRef._effects.setMinDate(this.initialState.minDate);
        this._dpContainerRef._effects.setMaxDate(this.initialState.maxDate);

        this._dpContainerRef.valueChange.pipe(skip(1)).subscribe((result: Date) => {
            const nowDate = new Date();
            const value = new Date(
                result.getFullYear(),
                result.getMonth(),
                result.getDate(),
                nowDate.getHours(),
                nowDate.getMinutes(),
                nowDate.getSeconds()
            );
            this.value = value;
            this.onValueChange(value);
        });
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
}
