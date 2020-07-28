import { ThyIconModule } from './../icon/icon.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyDateRangeComponent } from './date-range.component';
import { ThyActionMenuModule } from '../action-menu/action-menu.module';
// import { ThyDatepickerModule } from '../datepicker/datepicker.module';
import { ThyDirectiveModule } from '../directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThyDatePickerModule } from '../date-picker/date-picker.module';
import { OptionalDateRangesComponent } from './optional-dates/optional-dates.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyActionMenuModule,
        // ThyDatepickerModule,
        ThyDirectiveModule,
        ThyIconModule,
        BrowserAnimationsModule,
        ThyDatePickerModule
    ],
    declarations: [ThyDateRangeComponent, OptionalDateRangesComponent],
    exports: [ThyDateRangeComponent],
    entryComponents: [OptionalDateRangesComponent]
})
export class ThyDateRangeModule {}
