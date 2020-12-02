import { ThyIconModule } from 'ngx-tethys/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyDateRangeComponent } from './date-range.component';
import { ThyActionMenuModule } from 'ngx-tethys/action-menu';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { OptionalDateRangesComponent } from './optional-dates/optional-dates.component';
import { ThyNavModule } from 'ngx-tethys/nav';
@NgModule({
    imports: [CommonModule, FormsModule, ThyActionMenuModule, ThySharedModule, ThyIconModule, ThyDatePickerModule, ThyNavModule],
    declarations: [ThyDateRangeComponent, OptionalDateRangesComponent],
    exports: [ThyDateRangeComponent],
    entryComponents: [OptionalDateRangesComponent]
})
export class ThyDateRangeModule {}
