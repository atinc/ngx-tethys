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
import { ThyDatePickerFormatPipe, ThyDatePickerFormatStringPipe } from './picker.pipes';
import { ThyDatePickerDirective } from './date-picker.directive';
import { ThyRangePickerDirective } from './range-picker.directive';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThyDatePickerConfigService } from './date-picker.service';
import { THY_DATE_PICKER_CONFIG_PROVIDER } from './date-picker.config';

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
        ThyWeekPickerComponent,
        ThyRangePickerComponent,
        DatePickerRequiredValidator,
        RangePickerRequiredValidator,
        ThyDatePickerFormatPipe,
        ThyDatePickerFormatStringPipe,
        ThyDatePickerDirective,
        ThyRangePickerDirective
    ],
    exports: [
        ThyDatePickerComponent,
        ThyRangePickerComponent,
        ThyMonthPickerComponent,
        ThyYearPickerComponent,
        ThyWeekPickerComponent,
        DatePickerRequiredValidator,
        RangePickerRequiredValidator,
        ThyDatePickerFormatPipe,
        ThyDatePickerFormatStringPipe,
        ThyDatePickerDirective,
        ThyRangePickerDirective
    ],
    providers: [ThyDatePickerConfigService, THY_DATE_PICKER_CONFIG_PROVIDER]
})
export class ThyDatePickerModule {}
