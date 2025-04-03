import { Component, OnInit } from '@angular/core';
import { DateRangeItemInfo } from 'ngx-tethys/date-range';
import { differenceInDays } from 'ngx-tethys/util';

@Component({
    selector: 'app-date-range-disabled-date-example',
    templateUrl: './disabled-date.component.html'
})
export class ThyDateRangeDisabledDateExampleComponent implements OnInit {
    public date: DateRangeItemInfo;

    private selectedDate: Date[];

    constructor() {}

    ngOnInit() {}

    changeDate(date: DateRangeItemInfo) {
        console.log(date);
    }

    disabledDate = (date: Date) => {
        if (!(this.selectedDate && this.selectedDate.length === 1)) {
            return false;
        }
        const tooLate = differenceInDays(date, this.selectedDate[0]) > 7;
        const tooEarly = differenceInDays(this.selectedDate[0], date) > 7;
        return tooEarly || tooLate;
    };

    calendarChange(date: Date[]) {
        if (date.length === 1) {
            this.selectedDate = date;
        } else {
            this.selectedDate = [];
        }
    }
}
