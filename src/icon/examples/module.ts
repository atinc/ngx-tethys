import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyIconAllExampleComponent } from './all/all.component';
import { ThyIconBasicExampleComponent } from './basic/basic.component';
import { ThyIconLeggingExampleComponent } from './legging/legging.component';
import { ThyIconLinearGradientExampleComponent } from './linear-gradient/linear-gradient.component';
import { ThyIconNamespaceExampleComponent } from './namespace/namespace.component';
import { ThyIconRotateExampleComponent } from './rotate/rotate.component';
import { ThyIconTwotoneExampleComponent } from './twotone/twotone.component';

const COMPONENTS = [
    ThyIconBasicExampleComponent,
    ThyIconLeggingExampleComponent,
    ThyIconRotateExampleComponent,
    ThyIconTwotoneExampleComponent,
    ThyIconNamespaceExampleComponent,
    ThyIconLinearGradientExampleComponent,
    ThyIconAllExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, ThyIconModule, ThyTooltipModule],
    exports: [...COMPONENTS],
    providers: []
})
export class ThyIconExamplesModule {}
