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
import { NgxTethysModule } from 'ngx-tethys';
import { ThyCascaderModule } from 'ngx-tethys/cascader';
import { ThyCascaderEmptyExampleComponent } from './empty/empty.component';
const COMPONENTS = [
    ThyCascaderBasicExampleComponent,
    ThyCascaderSizeExampleComponent,
    ThyCascaderDisableExampleComponent,
    ThyCascaderSelectChangedExampleComponent,
    ThyCascaderAddCodeExampleComponent,
    ThyCascaderMoveUnfoldExampleComponent,
    ThyCascaderMoveUnfoldTriggerExampleComponent,
    ThyCascaderEmptyExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, FormsModule, NgxTethysModule, ThyCascaderModule],
    exports: [...COMPONENTS]
})
export class ThyCascaderExamplesModule {}
