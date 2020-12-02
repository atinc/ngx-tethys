import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyCalendarHeaderComponent } from './calendar-header.component';
import { ThyCalendarComponent } from './calendar.component';
import {
    ThyCalendarHeaderOperationDirective,
    ThyDateCellDirective,
    ThyDateFullCellDirective,
    ThyMonthCellDirective,
    ThyMonthFullCellDirective
} from './calendar-cells';
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
        ThyDateRangeModule
    ],
    declarations: [
        ThyCalendarHeaderComponent,
        ThyCalendarComponent,
        ThyDateCellDirective,
        ThyDateFullCellDirective,
        ThyMonthCellDirective,
        ThyMonthFullCellDirective,
        ThyCalendarHeaderOperationDirective
    ],
    exports: [
        ThyCalendarHeaderComponent,
        ThyCalendarComponent,
        ThyDateCellDirective,
        ThyDateFullCellDirective,
        ThyMonthCellDirective,
        ThyMonthFullCellDirective,
        ThyCalendarHeaderOperationDirective
    ]
})
export class ThyCalendarModule {}
