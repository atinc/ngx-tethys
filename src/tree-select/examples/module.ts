import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyTreeSelectBasicExampleComponent } from './basic/basic.component';
import { ThyTreeSelectCustomNodeExampleComponent } from './custom-node/custom-node.component';
import { ThyTreeSelectMoreNodeExampleComponent } from './more-node/more-node.component';
import { ThyTreeSelectHiddenExampleComponent } from './hidden/hidden.component';
import { ThyTreeSelectDisabledExampleComponent } from './disabled/disabled.component';
import { ThyTreeSelectMultipleExampleComponent } from './multiple/multiple.component';
import { ThyTreeSelectSizeExampleComponent } from './size/size.component';
import { ThyTreeSelectEmptySelectionExampleComponent } from './empty-selection/empty-selection.component';
import { ThyTreeSelectAsyncFetchExampleComponent } from './async-fetch/async-fetch.component';

const COMPONENTS = [
    ThyTreeSelectBasicExampleComponent,
    ThyTreeSelectCustomNodeExampleComponent,
    ThyTreeSelectMoreNodeExampleComponent,
    ThyTreeSelectHiddenExampleComponent,
    ThyTreeSelectDisabledExampleComponent,
    ThyTreeSelectMultipleExampleComponent,
    ThyTreeSelectSizeExampleComponent,
    ThyTreeSelectEmptySelectionExampleComponent,
    ThyTreeSelectAsyncFetchExampleComponent
];
@NgModule({
    imports: [CommonModule, FormsModule, NgxTethysModule],
    exports: COMPONENTS,
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    providers: []
})
export class ThyTreeSelectExamplesModule {}
