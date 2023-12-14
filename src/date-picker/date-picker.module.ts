import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import localeZhHans from '@angular/common/locales/zh-Hans';

import { LibPackerModule } from './lib/lib-packer.module';

import { BasePickerComponent } from './base-picker.component';
import { ThyDatePickerComponent } from './date-picker.component';
import { ThyMonthPickerComponent } from './month-picker.component';
import { ThyRangePickerComponent } from './range-picker.component';
import { ThyWeekPickerComponent } from './week-picker.component';
import { ThyYearPickerComponent } from './year-picker.component';
import { ThyPickerComponent } from './picker.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { DatePickerRequiredValidator, RangePickerRequiredValidator } from './picker.validators';
import { ThyDatePickerFormatPipe, ThyDatePickerFormatStringPipe, ThyQuarterPickerFormatPipe } from './picker.pipes';
import { ThyDatePickerDirective } from './date-picker.directive';
import { ThyRangePickerDirective } from './range-picker.directive';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThyDatePickerConfigService } from './date-picker.service';
import { ThyQuarterPickerComponent } from './quarter-picker.component';

registerLocaleData(localeZhHans, 'zh-Hans');

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        LibPackerModule,
        ThyIconModule,
        ThyInputModule,
        ThyPopoverModule,
        BasePickerComponent,
        ThyPickerComponent,
        ThyDatePickerComponent,
        ThyMonthPickerComponent,
        ThyYearPickerComponent,
        ThyQuarterPickerComponent,
        ThyWeekPickerComponent,
        ThyRangePickerComponent,
        DatePickerRequiredValidator,
        RangePickerRequiredValidator,
        ThyDatePickerFormatPipe,
        ThyQuarterPickerFormatPipe,
        ThyDatePickerFormatStringPipe,
        ThyDatePickerDirective,
        ThyRangePickerDirective
    ],
    exports: [
        ThyDatePickerComponent,
        ThyRangePickerComponent,
        ThyMonthPickerComponent,
        ThyYearPickerComponent,
        ThyQuarterPickerComponent,
        ThyWeekPickerComponent,
        DatePickerRequiredValidator,
        RangePickerRequiredValidator,
        ThyDatePickerFormatPipe,
        ThyQuarterPickerFormatPipe,
        ThyDatePickerFormatStringPipe,
        ThyDatePickerDirective,
        ThyRangePickerDirective
    ],
    providers: [ThyDatePickerConfigService]
})
export class ThyDatePickerModule {}
