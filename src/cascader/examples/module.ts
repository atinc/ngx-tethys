import { ThyCascaderModule } from 'ngx-tethys/cascader';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyCascaderBasicExampleComponent } from './basic/basic.component';
import { ThyCascaderSizeExampleComponent } from './size/size.component';
import { ThyCascaderDisableExampleComponent } from './disable/disable.component';
import { ThyCascaderSelectChangedExampleComponent } from './select-changed/select-changed.component';
import { ThyCascaderCustomTemplateExampleComponent } from './custom-template/custom-template.component';
import { ThyCascaderMoveUnfoldExampleComponent } from './move-unfold/move-unfold.component';
import { ThyCascaderMoveUnfoldTriggerExampleComponent } from './move-unfold-trigger/move-unfold-trigger.component';
import { ThyCascaderEmptyExampleComponent } from './empty/empty.component';
import { ThyCascaderMultipleExampleComponent } from './multiple/multiple.component';
import { ThySpaceModule } from 'ngx-tethys/space';

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
    imports: [CommonModule, FormsModule, ThySpaceModule, ThyCascaderModule],
    exports: [...COMPONENTS]
})
export class ThyCascaderExamplesModule {}
