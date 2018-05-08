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

    @ViewChild('dp')
    datepickerRef: any;

    public initialState: any;

    constructor(
        private cis: ComponentLoaderFactory,
        private _store: BsDatepickerStore
    ) { }

    ngOnInit() {
        setTimeout(() => {
            this.datepickerRef.show();
        }, 0);
    }

    onValueChange(value: Date): void {
        this.initialState.changeValue(value);
    }
}
