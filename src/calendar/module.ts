import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyCalendarHeader } from './calendar-header.component';
import { ThyCalendar } from './calendar.component';
import { ThyCalendarHeaderOperationDirective, ThyDateCellDirective } from './calendar-cells';
import { LibPackerModule } from 'ngx-tethys/date-picker';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyRadioModule } from 'ngx-tethys/radio';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyDateRangeModule } from 'ngx-tethys/date-range';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThySharedModule,
        ThyIconModule,
        LibPackerModule,
        ThySelectModule,
        ThyRadioModule,
        ThyButtonModule,
        ThyDateRangeModule,
        ThyCalendarHeader,
        ThyCalendar,
        ThyDateCellDirective,
        ThyCalendarHeaderOperationDirective
    ],
    exports: [ThyCalendarHeader, ThyCalendar, ThyDateCellDirective, ThyCalendarHeaderOperationDirective]
})
export class ThyCalendarModule {}
