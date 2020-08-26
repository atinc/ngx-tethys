import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyDatePickerBasicExampleComponent } from './basic/basic.component';
import { ThyDatePickerDefaultPickerValueExampleComponent } from './default-picker-value/default-picker-value.component';
import { ThyDatePickerDirectiveExampleComponent } from './directive/directive.component';
import { ThyDatePickerDisabledExampleComponent } from './disabled/disabled.component';
import { ThyDatePickerDisabledDateExampleComponent } from './disabled-date/disabled-date.component';
import { ThyDatePickerFormatExampleComponent } from './format/format.component';
import { ThyDatePickerReadonlyExampleComponent } from './readonly/readonly.component';
import { ThyDatePickerSizeExampleComponent } from './size/size.component';
import { ThyDatePickerSuffixIconExampleComponent } from './suffix-icon/suffix-icon.component';
import { ThyDatePickerTimeExampleComponent } from './time/time.component';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { ThyPropertyOperationModule } from 'ngx-tethys/property-operation';
import { ThyButtonModule } from 'ngx-tethys/button';

const COMPONENTS = [
    ThyDatePickerBasicExampleComponent,
    ThyDatePickerDefaultPickerValueExampleComponent,
    ThyDatePickerDirectiveExampleComponent,
    ThyDatePickerDisabledExampleComponent,
    ThyDatePickerDisabledDateExampleComponent,
    ThyDatePickerFormatExampleComponent,
    ThyDatePickerReadonlyExampleComponent,
    ThyDatePickerSizeExampleComponent,
    ThyDatePickerSuffixIconExampleComponent,
    ThyDatePickerTimeExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyDatePickerModule, ThyPropertyOperationModule, ThyButtonModule],
    exports: [...COMPONENTS]
})
export class ThyDatePickerExamplesModule {}
