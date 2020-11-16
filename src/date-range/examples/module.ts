import { NgModule } from '@angular/core';
import { ThyDateRangeBasicExampleComponent } from './basic/basic.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyDateRangeHiddenMenuExampleComponent } from './hidden-menu/hidden-menu.component';
import { ThyDateRangeDisabledSwitchIconExampleComponent } from './disabled-switch-icon/disabled-switch-icon.component';
import { ThyDateRangeCustomTextValueExampleComponent } from './custom-text-value/custom-text-value.component';
import { ThyDateRangeMinAndMaxDateExampleComponent } from './min-and-max-date/min-and-max-date.component';
import { ThyDateRangeOptionalDateRangesExampleComponent } from './optional-date-ranges/optional-date-ranges.component';
import { ThyDateRangeCustomTimeDisplayExampleComponent } from './custom-time-display/custom-time-display.component';

const COMPONENTS = [
    ThyDateRangeBasicExampleComponent,
    ThyDateRangeHiddenMenuExampleComponent,
    ThyDateRangeDisabledSwitchIconExampleComponent,
    ThyDateRangeCustomTextValueExampleComponent,
    ThyDateRangeMinAndMaxDateExampleComponent,
    ThyDateRangeOptionalDateRangesExampleComponent,
    ThyDateRangeCustomTimeDisplayExampleComponent
];
@NgModule({
    imports: [CommonModule, FormsModule, NgxTethysModule],
    exports: COMPONENTS,
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    providers: []
})
export class ThyDateRangeExamplesModule {}
