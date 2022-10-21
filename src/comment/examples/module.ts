import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyCommentModule } from 'ngx-tethys/comment';
import { ThyActionModule } from 'ngx-tethys/action';

import { ThyCommentBasicExampleComponent } from './basic/basic.component';
import { ThyCommentNestExampleComponent } from './nest/nest.component';

const COMPONENTS = [ThyCommentBasicExampleComponent, ThyCommentNestExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, ThyActionModule, ThyCommentModule],
    exports: COMPONENTS
})
export class ThyCommentExamplesModule {}
