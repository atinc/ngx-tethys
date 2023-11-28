import { MonthHeader } from './month/month-header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CalendarFooter } from './calendar/calendar-footer.component';
import { DatePopup } from './popups/date-popup.component';
import { InnerPopup } from './popups/inner-popup.component';
import { MonthTable } from './month/month-table.component';
import { DateTable } from './date/date-table.component';
import { DateTableCell } from './date/date-table-cell.component';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTimePickerModule } from 'ngx-tethys/time-picker';
import { YearTable } from './year/year-table.component';
import { YearHeader } from './year/year-header.component';
import { DecadeHeader } from './decade/decade-header.component';
import { DecadeTable } from './decade/decade-table.component';
import { DateHeader } from './date/date-header.component';
import { ThyNavModule } from 'ngx-tethys/nav';
import { ThyInputModule } from 'ngx-tethys/input';
import { DateCarousel } from './date-carousel/date-carousel.component';
import { DatePickerAdvancedShowYearTipPipe } from '../picker.pipes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyButtonModule,
        ThyIconModule,
        ThyTimePickerModule,
        ThyNavModule,
        ThyInputModule,
        CalendarFooter,
        DateTable,
        DateHeader,
        YearTable,
        YearHeader,
        MonthTable,
        MonthHeader,
        DecadeHeader,
        DecadeTable,
        InnerPopup,
        DatePopup,
        DateTableCell,
        DateCarousel,
        DatePickerAdvancedShowYearTipPipe
    ],
    exports: [
        CalendarFooter,
        DateTable,
        DateHeader,
        YearTable,
        YearHeader,
        MonthTable,
        MonthHeader,
        DecadeHeader,
        DecadeTable,
        InnerPopup,
        DatePopup,
        DateTableCell,
        DateCarousel
    ]
})
export class LibPackerModule {}
