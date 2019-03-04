import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-datepicker-next',
    templateUrl: 'datepicker-next.component.html'
})
export class ThyDatepickerNextComponent implements OnInit {
    @HostBinding('class.thy-datepicker-next') className = true;

    constructor() {}

    ngOnInit() {}
}
