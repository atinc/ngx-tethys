import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxTethysModule } from 'ngx-tethys';

import { ThyCopyBasicExampleComponent } from './basic/basic.component';
import { ThyCopyCopyContentExampleComponent } from './copy-content/copy-content.component';

const COMPONENTS = [ThyCopyBasicExampleComponent, ThyCopyCopyContentExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule],
    exports: COMPONENTS,
    providers: []
})
export class ThyCopyExamplesModule {}
