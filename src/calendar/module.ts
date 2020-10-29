import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyDirectiveModule } from '../directive';
import { ThyIconModule } from '../icon';
import { ThyCalendarHeaderComponent } from './calendar-header.component';
import { ThyCalendarComponent } from './calendar.component';
import {
    ThyCalendarHeaderOperationDirective,
    ThyDateCellDirective,
    ThyDateFullCellDirective,
    ThyMonthCellDirective,
    ThyMonthFullCellDirective
} from './calendar-cells';
import { LibPackerModule } from '../date-picker/lib/lib-packer.module';
import { ThySelectModule } from '../select/module';
import { ThyRadioModule } from '../radio/module';
import { ThyButtonModule } from '../button/button.module';
import { ThyDateRangeModule } from '../date-range/module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyDirectiveModule,
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
