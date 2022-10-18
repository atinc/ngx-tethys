import { ThyCommentModule } from 'ngx-tethys/comment';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyCommentBasicExampleComponent } from './basic/basic.component';
import { ThyCommentNestExampleComponent } from './nest/nest.component';

const COMPONENTS = [ThyCommentBasicExampleComponent, ThyCommentNestExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, ThyCommentModule],
    exports: COMPONENTS,
    providers: []
})
export class ThyVoteExamplesModule {}
