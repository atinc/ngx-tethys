import { NgModule } from '@angular/core';
import { ThyCascaderBasicExampleComponent } from './basic/basic.component';
import { ThyCascaderSizeExampleComponent } from './size/size.component';
import { ThyCascaderDisableExampleComponent } from './disable/disable.component';
import { ThyCascaderSelectChangedExampleComponent } from './select-changed/select-changed.component';
import { ThyCascaderAddCodeExampleComponent } from './add-code/add-code.component';
import { ThyCascaderMoveUnfoldExampleComponent } from './move-unfold/move-unfold.component';
import { ThyCascaderMoveUnfoldTriggerExampleComponent } from './move-unfold-trigger/move-unfold-trigger.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxTethysModule, ThyCascaderModule } from 'ngx-tethys';
const COMPONENTS = [
    ThyCascaderBasicExampleComponent,
    ThyCascaderSizeExampleComponent,
    ThyCascaderDisableExampleComponent,
    ThyCascaderSelectChangedExampleComponent,
    ThyCascaderAddCodeExampleComponent,
    ThyCascaderMoveUnfoldExampleComponent,
    ThyCascaderMoveUnfoldTriggerExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, FormsModule, NgxTethysModule, ThyCascaderModule],
    exports: [...COMPONENTS]
})
export class ThyCascaderExamplesModule {}
