import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import localeZh from '@angular/common/locales/zh';
import localeZhHans from '@angular/common/locales/zh-Hans';
import localezhHant from '@angular/common/locales/zh-Hant';
import localeEn from '@angular/common/locales/en';
import localeJa from '@angular/common/locales/ja';
import localeDe from '@angular/common/locales/de';

import { LibPackerModule } from './lib/lib-packer.module';

import { BasePicker } from './base-picker.component';
import { ThyDatePicker } from './date-picker.component';
import { ThyMonthPicker } from './month-picker.component';
import { ThyRangePicker } from './range-picker.component';
import { ThyWeekPicker } from './week-picker.component';
import { ThyYearPicker } from './year-picker.component';
import { ThyPicker } from './picker.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { DatePickerRequiredValidator, RangePickerRequiredValidator } from './picker.validators';
import { ThyDatePickerFormatPipe, ThyDatePickerFormatStringPipe, ThyQuarterPickerFormatPipe } from './picker.pipes';
import { ThyDatePickerDirective } from './date-picker.directive';
import { ThyRangePickerDirective } from './range-picker.directive';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThyDatePickerConfigService } from './date-picker.service';
import { ThyQuarterPicker } from './quarter-picker.component';

registerLocaleData(localeZh, 'zh');
registerLocaleData(localeZhHans, 'zh-Hans');
registerLocaleData(localezhHant, 'zh-Hant');
registerLocaleData(localeEn, 'en');
registerLocaleData(localeJa, 'ja');
registerLocaleData(localeDe, 'de');

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        LibPackerModule,
        ThyIconModule,
        ThyInputModule,
        ThyPopoverModule,
        BasePicker,
        ThyPicker,
        ThyDatePicker,
        ThyMonthPicker,
        ThyYearPicker,
        ThyQuarterPicker,
        ThyWeekPicker,
        ThyRangePicker,
        DatePickerRequiredValidator,
        RangePickerRequiredValidator,
        ThyDatePickerFormatPipe,
        ThyQuarterPickerFormatPipe,
        ThyDatePickerFormatStringPipe,
        ThyDatePickerDirective,
        ThyRangePickerDirective
    ],
    exports: [
        ThyDatePicker,
        ThyRangePicker,
        ThyMonthPicker,
        ThyYearPicker,
        ThyQuarterPicker,
        ThyWeekPicker,
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
