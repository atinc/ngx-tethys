import { Component, OnInit, Input } from '@angular/core';
import { DateRangeItemInfo } from '../date-range.class';

@Component({
    selector: 'date-range-optional',
    templateUrl: './optional-dates.component.html'
})
export class OptionalDateRangesComponent implements OnInit {
    @Input() thyHiddenMenu = false;

    @Input() optionalDateRanges: DateRangeItemInfo[];

    @Input() customValue = '自定义';

    @Input() customKey: string;

    selectedDateRange: (date: DateRangeItemInfo) => void;

    selectedDate: DateRangeItemInfo;

    constructor() {}

    ngOnInit() {}

    _selectDateRange(dateRange: DateRangeItemInfo) {
        this.selectedDate = dateRange;
        this.selectedDateRange(dateRange);
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
