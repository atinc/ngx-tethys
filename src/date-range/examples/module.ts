import { NgModule } from '@angular/core';
import { ThyDateRangeBasicExampleComponent } from './basic/basic.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyDateRangeHiddenMenuExampleComponent } from './hidden-menu/hidden-menu.component';
import { ThyDateRangeHiddenSwitchIconExampleComponent } from './hidden-switch-icon/hidden-switch-icon.component';
import { ThyDateRangeFormatSelectedValueExampleComponent } from './format-selected-value/format-selected-value.component';
import { ThyDateRangeCustomTextValueExampleComponent } from './custom-text-value/custom-text-value.component';
import { ThyDateRangeMinAndMaxDateExampleComponent } from './min-and-max-date/min-and-max-date.component';
import { ThyDateRangeOptionalDateRangesExampleComponent } from './optional-date-ranges/optional-date-ranges.component';

const COMPONENTS = [
    ThyDateRangeBasicExampleComponent,
    ThyDateRangeHiddenMenuExampleComponent,
    ThyDateRangeHiddenSwitchIconExampleComponent,
    ThyDateRangeFormatSelectedValueExampleComponent,
    ThyDateRangeCustomTextValueExampleComponent,
    ThyDateRangeMinAndMaxDateExampleComponent,
    ThyDateRangeOptionalDateRangesExampleComponent
];
@NgModule({
    imports: [CommonModule, FormsModule, NgxTethysModule],
    exports: COMPONENTS,
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    providers: []
})
export class ThyDateRangeExamplesModule {}
