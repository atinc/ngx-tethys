import { ThyDateRangeModule } from 'ngx-tethys/date-range';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyDateRangeBasicExampleComponent } from './basic/basic.component';
import { ThyDateRangeCustomTextValueExampleComponent } from './custom-text-value/custom-text-value.component';
import { ThyDateRangeCustomTimeDisplayExampleComponent } from './custom-time-display/custom-time-display.component';
import { ThyDateRangeDisabledDateExampleComponent } from './disabled-date/disabled-date.component';
import { ThyDateRangeDisabledSwitchIconExampleComponent } from './disabled-switch-icon/disabled-switch-icon.component';
import { ThyDateRangeHiddenMenuExampleComponent } from './hidden-menu/hidden-menu.component';
import { ThyDateRangeMinAndMaxDateExampleComponent } from './min-and-max-date/min-and-max-date.component';
import { ThyDateRangeOptionalDateRangesExampleComponent } from './optional-date-ranges/optional-date-ranges.component';

const COMPONENTS = [
    ThyDateRangeBasicExampleComponent,
    ThyDateRangeHiddenMenuExampleComponent,
    ThyDateRangeDisabledSwitchIconExampleComponent,
    ThyDateRangeCustomTextValueExampleComponent,
    ThyDateRangeMinAndMaxDateExampleComponent,
    ThyDateRangeOptionalDateRangesExampleComponent,
    ThyDateRangeCustomTimeDisplayExampleComponent,
    ThyDateRangeDisabledDateExampleComponent
];
@NgModule({
    imports: [CommonModule, FormsModule, ThyDateRangeModule],
    exports: COMPONENTS,
    declarations: COMPONENTS,
    providers: []
})
export class ThyDateRangeExamplesModule {}
