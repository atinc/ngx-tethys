import { ThyIconModule } from './../icon/icon.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyDateRangeComponent } from './date-range.component';
import { ThyActionMenuModule } from '../action-menu/action-menu.module';
import { ThyDatepickerModule } from '../datepicker/datepicker.module';
import { ThyDirectiveModule } from '../directive';

@NgModule({
    imports: [CommonModule, FormsModule, ThyActionMenuModule, ThyDatepickerModule, ThyDirectiveModule, ThyIconModule],
    declarations: [ThyDateRangeComponent],
    exports: [ThyDateRangeComponent]
})
export class ThyDateRangeModule {}
