import { MonthHeaderComponent } from './month/month-header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CalendarFooterComponent } from './calendar/calendar-footer.component';
import { DatePopupComponent } from './popups/date-popup.component';
import { InnerPopupComponent } from './popups/inner-popup.component';
import { MonthTableComponent } from './month/month-table.component';
import { DateTableComponent } from './date/date-table.component';
import { DateTableCellComponent } from './date/date-table-cell.component';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInnerTimePickerModule } from 'ngx-tethys/inner-time-picker';
import { YearTableComponent } from './year/year-table.component';
import { YearHeaderComponent } from './year/year-header.component';
import { DecadeHeaderComponent } from './decade/decade-header.component';
import { DecadeTableComponent } from './decade/decade-table.component';
import { DateHeaderComponent } from './date/date-header.component';
import { ThyNavModule } from 'ngx-tethys/nav';
import { ThyInputModule } from 'ngx-tethys/input';
import { DateCarouselComponent } from './date-carousel/date-carousel.component';
import { DatePickerAdvancedShowYearTipPipe } from '../picker.pipes';

@NgModule({
    imports: [CommonModule, FormsModule, ThyButtonModule, ThyIconModule, ThyInnerTimePickerModule, ThyNavModule, ThyInputModule],
    exports: [
        CalendarFooterComponent,
        DateTableComponent,
        DateHeaderComponent,
        YearTableComponent,
        YearHeaderComponent,
        MonthTableComponent,
        MonthHeaderComponent,
        DecadeHeaderComponent,
        DecadeTableComponent,
        InnerPopupComponent,
        DatePopupComponent,
        DateTableCellComponent,
        DateCarouselComponent
    ],
    declarations: [
        CalendarFooterComponent,
        DateTableComponent,
        DateHeaderComponent,
        YearTableComponent,
        YearHeaderComponent,
        MonthTableComponent,
        MonthHeaderComponent,
        DecadeHeaderComponent,
        DecadeTableComponent,
        InnerPopupComponent,
        DatePopupComponent,
        DateTableCellComponent,
        DateCarouselComponent,
        DatePickerAdvancedShowYearTipPipe
    ]
})
export class LibPackerModule {}
