import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyDateRangeComponent } from './date-range.component';
import { ThyActionMenuModule } from '../action-menu/action-menu.module';
import { ThyDatepickerModule } from '../datepicker/datepicker.module';
import { ThyDirectiveModule } from '../directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyActionMenuModule,
        ThyDatepickerModule,
        ThyDirectiveModule
    ],
    declarations: [
        ThyDateRangeComponent
    ],
    exports: [
        ThyDateRangeComponent
    ]
})
export class ThyDateRangeModule {

}
