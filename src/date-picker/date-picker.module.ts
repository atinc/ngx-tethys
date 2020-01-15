import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LibPackerModule } from './lib/lib-packer.module';

import { BasePickerComponent } from './base-picker.component';
import { HeaderPickerComponent } from './header-picker.component';
import { ThyDatePickerComponent } from './date-picker.component';
import { ThyMonthPickerComponent } from './month-picker.component';
import { ThyRangePickerComponent } from './range-picker.component';
import { ThyWeekPickerComponent } from './week-picker.component';
import { ThyYearPickerComponent } from './year-picker.component';
import { ThyPickerComponent } from './picker.component';
import { ThyIconModule } from '../icon/icon.module';
import { ThyInputModule } from '../input/module';
import { DatePickerRequiredValidator, RangePickerRequiredValidator } from './picker.validators';
import { ThyDatePickerFormatPipe } from './picker.pipes';
import { ThyDatePickerDirective } from './date-picker.directive';
import { ThyRangePickerDirective } from './range-picker.directive';
import { DatePopupComponent } from './lib/popups/date-popup.component';
import { ThyPopoverModule } from '../popover';

@NgModule({
    imports: [CommonModule, OverlayModule, LibPackerModule, ThyIconModule, ThyInputModule, ThyPopoverModule],
    exports: [
        ThyDatePickerComponent,
        ThyRangePickerComponent,
        ThyMonthPickerComponent,
        ThyYearPickerComponent,
        ThyWeekPickerComponent,
        DatePickerRequiredValidator,
        RangePickerRequiredValidator,
        ThyDatePickerFormatPipe,
        ThyDatePickerDirective,
        ThyRangePickerDirective
    ],
    declarations: [
        HeaderPickerComponent,
        BasePickerComponent,
        ThyPickerComponent,
        ThyDatePickerComponent,
        ThyMonthPickerComponent,
        ThyYearPickerComponent,
        ThyWeekPickerComponent,
        ThyRangePickerComponent,
        DatePickerRequiredValidator,
        RangePickerRequiredValidator,
        ThyDatePickerFormatPipe,
        ThyDatePickerDirective,
        ThyRangePickerDirective
    ],
    entryComponents: [DatePopupComponent]
})
export class ThyDatePickerModule {}
