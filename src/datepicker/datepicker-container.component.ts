import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BsDatepickerContainerComponent } from 'ngx-bootstrap/datepicker/themes/bs/bs-datepicker-container.component';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { BsDatepickerStore } from 'ngx-bootstrap/datepicker/reducer/bs-datepicker.store';

import { ThyDatepickerConfig } from './datepicker.config';

@Component({
    selector: 'thy-datepicker-container',
    templateUrl: './datepicker-container.component.html'
})
export class ThyDatepickerContainerComponent implements OnInit {

    initialState: any;

    timeValue: Date;

    isShowTime = false;

    @ViewChild('dp')
    private datepickerRef: any;

    private isMeridian = false;

    constructor(
        private cis: ComponentLoaderFactory,
        private _store: BsDatepickerStore
    ) { }

    ngOnInit() {
        this.isShowTime = this.initialState.value.with_time;

        setTimeout(() => {
            this.datepickerRef.show();
        }, 0);

        this._initTimeValue();
    }

    onTimeOk() {
        this.onValueChange(this._getTimeValue());
    }

    onValueChange(value: Date): void {
        this.initialState.changeValue({
            date: value,
            with_time: this.initialState.value.with_time
        });
    }

    private _initTimeValue() {
        if (this.isShowTime) {
            this.timeValue = new Date();
            // this.timeValue = new Date(this.initialState.value.date.getTime());
        }
    }

    private _getTimeValue(): Date {
        const v = this.initialState.value.date;
        const t = this.timeValue;
        return new Date(
            v.getFullYear(),
            v.getMonth() + 1,
            v.getDay(),
            t.getHours(),
            t.getMinutes()
        );
    }
}
