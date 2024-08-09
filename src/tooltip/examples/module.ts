import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThyDropdownModule } from 'ngx-tethys/dropdown';

import { ThyTooltipBasicExampleComponent } from './basic/basic.component';
import { ThyTooltipPositionExampleComponent } from './position/position.component';
import { ThyTooltipTemplateExampleComponent } from './template/template.component';
import { ThyTooltipManualExampleComponent } from './manual/manual.component';
import { ThyInputNumberModule } from 'ngx-tethys/input-number';

const COMPONENTS = [
    ThyTooltipBasicExampleComponent,
    ThyTooltipPositionExampleComponent,
    ThyTooltipTemplateExampleComponent,
    ThyTooltipManualExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        ThyButtonModule,
        ThyFormModule,
        ThySelectModule,
        ThyInputModule,
        ThyTooltipModule,
        ThyDropdownModule,
        ThySpaceModule,
        ThyInputNumberModule
    ],
    exports: COMPONENTS,
    providers: []
})
export class ThyTooltipExamplesModule {}
