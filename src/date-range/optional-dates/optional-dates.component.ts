import { Component, OnInit } from '@angular/core';
import { DateRangeItemInfo } from '../date-range.class';
import { ThyPopover } from 'ngx-tethys/popover';

@Component({
    selector: 'date-range-optional',
    templateUrl: './optional-dates.component.html'
})
export class OptionalDateRangesComponent implements OnInit {
    hiddenMenu = false;

    optionalDateRanges: DateRangeItemInfo[];

    customValue = '自定义';

    customKey: string;

    minDate: number | Date;

    maxDate: number | Date;

    selectedDateRange: (date: DateRangeItemInfo) => void;

    selectedDate: DateRangeItemInfo;

    constructor(private thyPopover: ThyPopover) {}

    ngOnInit() {}

    _selectDateRange(dateRange: DateRangeItemInfo) {
        this.selectedDate = dateRange;
        this.selectedDateRange(dateRange);
        this.thyPopover.close();
    }

    _selectedCustomDate(date: DateRangeItemInfo) {
        this.selectedDate = {
            begin: date.begin,
            end: date.end,
            key: this.customKey,
            text: this.customValue
        };
        this.selectedDateRange(this.selectedDate);
    }
}
