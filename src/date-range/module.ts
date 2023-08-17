import { ThyIconModule } from 'ngx-tethys/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyDateRangeComponent } from './date-range.component';
import { ThyDropdownModule } from 'ngx-tethys/dropdown';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { OptionalDateRangesComponent } from './optional-dates/optional-dates.component';
import { ThyNavModule } from 'ngx-tethys/nav';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyDropdownModule,
        ThySharedModule,
        ThyIconModule,
        ThyDatePickerModule,
        ThyNavModule,
        ThyDateRangeComponent,
        OptionalDateRangesComponent
    ],
    exports: [ThyDateRangeComponent]
})
export class ThyDateRangeModule {}
