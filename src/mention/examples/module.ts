import { NgxTethysModule } from 'ngx-tethys';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyMentionAsyncExampleComponent } from './async/async.component';
import { ThyMentionBasicExampleComponent } from './basic/basic.component';

const COMPONENTS = [ThyMentionBasicExampleComponent, ThyMentionAsyncExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, FormsModule, NgxTethysModule],
    exports: [...COMPONENTS]
})
export class ThyMentionExamplesModule {}
