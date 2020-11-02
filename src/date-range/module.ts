import { ThyIconModule } from './../icon/icon.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyDateRangeComponent } from './date-range.component';
import { ThyActionMenuModule } from '../action-menu/action-menu.module';
import { ThyDirectiveModule } from '../directive';
import { ThyDatePickerModule } from '../date-picker/date-picker.module';
import { OptionalDateRangesComponent } from './optional-dates/optional-dates.component';
import { ThyNavModule } from '../nav/nav.module';
@NgModule({
    imports: [CommonModule, FormsModule, ThyActionMenuModule, ThyDirectiveModule, ThyIconModule, ThyDatePickerModule, ThyNavModule],
    declarations: [ThyDateRangeComponent, OptionalDateRangesComponent],
    exports: [ThyDateRangeComponent],
    entryComponents: [OptionalDateRangesComponent]
})
export class ThyDateRangeModule {}
