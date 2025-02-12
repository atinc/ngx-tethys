import { Component, OnInit, Signal, inject } from '@angular/core';
import { DateRangeItemInfo } from '../date-range.class';
import { ThyPopover } from 'ngx-tethys/popover';
import { FormsModule } from '@angular/forms';
import { ThyRangePickerDirective } from 'ngx-tethys/date-picker';
import { ThyIcon } from 'ngx-tethys/icon';
import {
    ThyDropdownMenuComponent,
    ThyDropdownMenuItemDirective,
    ThyDropdownMenuItemNameDirective,
    ThyDropdownMenuItemExtendIconDirective
} from 'ngx-tethys/dropdown';
import { injectLocale, ThyDateRangeLocale } from 'ngx-tethys/i18n';

/**
 * @private
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'date-range-optional',
    templateUrl: './optional-dates.component.html',
    imports: [
        ThyDropdownMenuComponent,
        ThyDropdownMenuItemDirective,
        ThyDropdownMenuItemNameDirective,
        ThyDropdownMenuItemExtendIconDirective,
        ThyIcon,
        ThyRangePickerDirective,
        FormsModule
    ]
})
export class OptionalDateRanges implements OnInit {
    private thyPopover = inject(ThyPopover);
    private locale: Signal<ThyDateRangeLocale> = injectLocale('dateRange');

    hiddenMenu = false;

    optionalDateRanges: DateRangeItemInfo[];

    customValue = this.locale().custom;

    customKey: string;

    minDate: number | Date;

    maxDate: number | Date;

    disabledDate: (d: Date) => boolean;

    selectedDateRange: (date: DateRangeItemInfo) => void;

    calendarChange: (date: Date[]) => void;

    selectedDate: DateRangeItemInfo;

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
