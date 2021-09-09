import { NgxTethysModule, ThySpaceModule } from 'ngx-tethys';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyTooltipBasicExampleComponent } from './basic/basic.component';
import { ThyTooltipPositionExampleComponent } from './position/position.component';
import { ThyTooltipTemplateDataExampleComponent } from './template-data/template-data.component';
import { ThyTooltipTemplateExampleComponent } from './template/template.component';

const COMPONENTS = [
    ThyTooltipBasicExampleComponent,
    ThyTooltipPositionExampleComponent,
    ThyTooltipTemplateExampleComponent,
    ThyTooltipTemplateDataExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule, ThySpaceModule],
    entryComponents: COMPONENTS,
    exports: COMPONENTS,
    providers: []
})
export class ThyTooltipExamplesModule {}
