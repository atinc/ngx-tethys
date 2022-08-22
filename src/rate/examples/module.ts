import { ThyRateModule } from 'ngx-tethys/rate';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyRateBasicExampleComponent } from './basic/basic.component';
import { ThyRateClearExampleComponent } from './clear/clear.component';
import { ThyRateCountExampleComponent } from './count/count.component';
import { ThyRateDisabledExampleComponent } from './disabled/disabled.component';
import { ThyRateHalfExampleComponent } from './half/half.component';
import { ThyRateTemplateExampleComponent } from './template/template.component';
import { ThyRateTooltipExampleComponent } from './tooltip/tooltip.component';

const COMPONENTS = [
    ThyRateBasicExampleComponent,
    ThyRateTemplateExampleComponent,
    ThyRateHalfExampleComponent,
    ThyRateDisabledExampleComponent,
    ThyRateClearExampleComponent,
    ThyRateCountExampleComponent,
    ThyRateTooltipExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyRateModule],
    exports: [...COMPONENTS],
    providers: []
})
export class ThyRateExamplesModule {
    constructor() {}
}
