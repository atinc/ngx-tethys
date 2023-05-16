import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyDatePickerBasicExampleComponent } from './basic/basic.component';
import { ThyDatePickerDirectiveExampleComponent } from './directive/directive.component';
import { ThyDatePickerDisabledExampleComponent } from './disabled/disabled.component';
import { ThyDatePickerDisabledDateExampleComponent } from './disabled-date/disabled-date.component';
import { ThyDatePickerFormatExampleComponent } from './format/format.component';
import { ThyDatePickerReadonlyExampleComponent } from './readonly/readonly.component';
import { ThyDatePickerSizeExampleComponent } from './size/size.component';
import { ThyDatePickerSuffixIconExampleComponent } from './suffix-icon/suffix-icon.component';
import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { ThyPropertyOperationModule } from 'ngx-tethys/property-operation';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyDatePickerShortcutExampleComponent } from './shortcut/shortcut.component';
import { ThyFormModule } from 'ngx-tethys/form';
import { THY_DATE_PICKER_CONFIG } from 'ngx-tethys/date-picker/date-picker.config';
import { addWeeks, startOfDay, startOfWeek } from 'date-fns';

const COMPONENTS = [
    ThyDatePickerBasicExampleComponent,
    ThyDatePickerDirectiveExampleComponent,
    ThyDatePickerDisabledExampleComponent,
    ThyDatePickerDisabledDateExampleComponent,
    ThyDatePickerFormatExampleComponent,
    ThyDatePickerReadonlyExampleComponent,
    ThyDatePickerSizeExampleComponent,
    ThyDatePickerSuffixIconExampleComponent,
    ThyDatePickerShortcutExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyDatePickerModule, ThyPropertyOperationModule, ThyButtonModule, ThyFormModule],
    exports: [...COMPONENTS],
    providers: [
        {
            provide: THY_DATE_PICKER_CONFIG,
            useValue: {
                showShortcut: true,
                shortcutDatePresets: [
                    {
                        title: '今天',
                        value: startOfDay(new Date()).getTime()
                    },
                    {
                        title: '下周',
                        value: startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 }).getTime()
                    }
                ],
            }
        }
    ],
})
export class ThyDatePickerExamplesModule {}
