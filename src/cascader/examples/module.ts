import { ThyCascaderModule } from 'ngx-tethys/cascader';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyCascaderAddCodeExampleComponent } from './add-code/add-code.component';
import { ThyCascaderBasicExampleComponent } from './basic/basic.component';
import { ThyCascaderDisableExampleComponent } from './disable/disable.component';
import { ThyCascaderEmptyExampleComponent } from './empty/empty.component';
import { ThyCascaderMoveUnfoldTriggerExampleComponent } from './move-unfold-trigger/move-unfold-trigger.component';
import { ThyCascaderMoveUnfoldExampleComponent } from './move-unfold/move-unfold.component';
import { ThyCascaderSelectChangedExampleComponent } from './select-changed/select-changed.component';
import { ThyCascaderSizeExampleComponent } from './size/size.component';

const COMPONENTS = [
    ThyCascaderBasicExampleComponent,
    ThyCascaderSizeExampleComponent,
    ThyCascaderDisableExampleComponent,
    ThyCascaderSelectChangedExampleComponent,
    ThyCascaderCustomTemplateExampleComponent,
    ThyCascaderMoveUnfoldExampleComponent,
    ThyCascaderMoveUnfoldTriggerExampleComponent,
    ThyCascaderEmptyExampleComponent,
    ThyCascaderMultipleExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyCascaderModule],
    exports: [...COMPONENTS]
})
export class ThyCascaderExamplesModule {}
