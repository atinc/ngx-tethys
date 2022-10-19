import { ThyCommentModule } from 'ngx-tethys/comment';
import { ThyActionModule } from 'ngx-tethys/action';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyCommentBasicExampleComponent } from './basic/basic.component';
import { ThyCommentNestExampleComponent } from './nest/nest.component';
import { ThyCommentActionsExampleComponent } from './actions/actions.component';

const COMPONENTS = [ThyCommentBasicExampleComponent, ThyCommentNestExampleComponent, ThyCommentActionsExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, ThyActionModule, ThyCommentModule],
    exports: COMPONENTS,
    providers: []
})
export class ThyVoteExamplesModule {}
