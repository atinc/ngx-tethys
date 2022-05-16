import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTreeSelectModule } from 'ngx-tethys/tree-select';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyTreeSelectAsyncFetchExampleComponent } from './async-fetch/async-fetch.component';
import { ThyTreeSelectBasicExampleComponent } from './basic/basic.component';
import { ThyTreeSelectCustomNodeExampleComponent } from './custom-node/custom-node.component';
import { ThyTreeSelectDisabledExampleComponent } from './disabled/disabled.component';
import { ThyTreeSelectEmptySelectionExampleComponent } from './empty-selection/empty-selection.component';
import { ThyTreeSelectHiddenExampleComponent } from './hidden/hidden.component';
import { ThyTreeSelectMoreNodeExampleComponent } from './more-node/more-node.component';
import { ThyTreeSelectMultipleExampleComponent } from './multiple/multiple.component';
import { ThyTreeSelectSearchExampleComponent } from './search/search.component';
import { ThyTreeSelectSizeExampleComponent } from './size/size.component';

const COMPONENTS = [
    ThyTreeSelectBasicExampleComponent,
    ThyTreeSelectCustomNodeExampleComponent,
    ThyTreeSelectMoreNodeExampleComponent,
    ThyTreeSelectHiddenExampleComponent,
    ThyTreeSelectDisabledExampleComponent,
    ThyTreeSelectMultipleExampleComponent,
    ThyTreeSelectSizeExampleComponent,
    ThyTreeSelectEmptySelectionExampleComponent,
    ThyTreeSelectAsyncFetchExampleComponent,
    ThyTreeSelectSearchExampleComponent
];
@NgModule({
    imports: [CommonModule, FormsModule, ThyTreeSelectModule, ThyButtonModule, ThyIconModule],
    exports: COMPONENTS,
    declarations: COMPONENTS,
    providers: []
})
export class ThyTreeSelectExamplesModule {}
