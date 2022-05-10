import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTreeModule } from 'ngx-tethys/tree';
import { ThyCollapseModule } from 'ngx-tethys/collapse';
import { ThyAvatarModule } from 'ngx-tethys/avatar';

import { ThyCollapseAccordionExampleComponent } from './accordion/accordion.component';
import { ThyCollapseArrowExampleComponent } from './arrow/arrow.component';
import { ThyCollapseBasicExampleComponent } from './basic/basic.component';
import { ThyCollapseBorderlessExampleComponent } from './borderless/borderless.component';
import { ThyCollapseCustomExampleComponent } from './custom/custom.component';
import { ThyCollapseDisabledExampleComponent } from './disabled/disabled.component';
import { ThyCollapseGhostExampleComponent } from './ghost/ghost.component';
import { ThyCollapseTreeExampleComponent } from './tree/tree.component';

const COMPONENTS = [
    ThyCollapseBasicExampleComponent,
    ThyCollapseDisabledExampleComponent,
    ThyCollapseAccordionExampleComponent,
    ThyCollapseArrowExampleComponent,
    ThyCollapseCustomExampleComponent,
    ThyCollapseTreeExampleComponent,
    ThyCollapseGhostExampleComponent,
    ThyCollapseBorderlessExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyIconModule, ThyTreeModule, ThyCollapseModule, ThyAvatarModule],
    exports: [...COMPONENTS]
})
export class ThyCollapseExamplesModule {}
