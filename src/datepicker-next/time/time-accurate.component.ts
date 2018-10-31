import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-datepicker-next-time-accurate',
    templateUrl: 'time-accurate.component.html'
})

export class ThyDatepickerNextTimeAccurateComponent implements OnInit {

    @HostBinding('class') stylesClass = 'time-accurate-container';

    constructor() { }

    ngOnInit() { }
}
