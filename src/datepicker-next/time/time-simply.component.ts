import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-datepicker-next-time-simply',
    templateUrl: 'time-simply.component.html'
})

export class ThyDatepickerNextTimeSimplyComponent implements OnInit {

    @HostBinding('class') stylesClass = 'time-simply-container';

    constructor() { }

    ngOnInit() { }
}
