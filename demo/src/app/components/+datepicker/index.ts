import { NgModule } from '@angular/core';
import { DemoDatePickerNextSectionComponent } from './datepicker-section.component';
import { SharedModule } from '../../shared.module';
import { DemoDatePickerBasicComponent } from './basic/datepicker-basic.component';
import { DemoDatePickerFormatComponent } from './format/datepicker-format.component';
import { DemoDatePickerSizeComponent } from './size/datepicker-size.component';
import { DemoDatePickerTimeComponent } from './time/datepicker-time.component';
import { DemoDatePickerDisabledDateComponent } from './disabled-date/datepicker-disabled-date.component';
import { DemoDatePickerDisabledComponent } from './disabled/datepicker-disabled.component';
import { DemoDatePickerDirectiveComponent } from './directive/datepicker-directive.component';
import { DemoDatePickerReadonlyComponent } from './readonly/datepicker-readonly.component';
import { DemoDatePickerDefaultPickerValueComponent } from './default-picker-value/datepicker-default-picker-value.component';

@NgModule({
    declarations: [
        DemoDatePickerNextSectionComponent,
        DemoDatePickerBasicComponent,
        DemoDatePickerFormatComponent,
        DemoDatePickerSizeComponent,
        DemoDatePickerTimeComponent,
        DemoDatePickerDisabledDateComponent,
        DemoDatePickerDisabledComponent,
        DemoDatePickerDirectiveComponent,
        DemoDatePickerReadonlyComponent,
        DemoDatePickerDefaultPickerValueComponent
    ],
    entryComponents: [
        DemoDatePickerBasicComponent,
        DemoDatePickerFormatComponent,
        DemoDatePickerSizeComponent,
        DemoDatePickerTimeComponent,
        DemoDatePickerDisabledDateComponent,
        DemoDatePickerDisabledComponent,
        DemoDatePickerDirectiveComponent,
        DemoDatePickerReadonlyComponent,
        DemoDatePickerDefaultPickerValueComponent
    ],
    imports: [SharedModule],
    exports: [DemoDatePickerNextSectionComponent]
})
export class DemoDatePickerModule {}
