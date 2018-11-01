import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-datepicker-next-time',
    templateUrl: 'time.component.html'
})

export class ThyDatepickerNextTimeComponent implements OnInit {

    @HostBinding('class') stylesClass = 'time-container';

    isEdit = false;

    timeText: string;

    constructor() { }

    ngOnInit() {

    }

    private _combinationTimeText() {

    }

    behaviorOnChange() {

    }

    behaviorOnDone() {

    }
}
