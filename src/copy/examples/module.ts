import { ThyCopyModule } from 'ngx-tethys/copy';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyCopyBasicExampleComponent } from './basic/basic.component';
import { ThyCopyCopyContentExampleComponent } from './copy-content/copy-content.component';
import { ThyCopyNotifyExampleComponent } from './notify/notify.component';

const COMPONENTS = [ThyCopyBasicExampleComponent, ThyCopyCopyContentExampleComponent, ThyCopyNotifyExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, ThyCopyModule],
    exports: COMPONENTS,
    providers: []
})
export class ThyCopyExamplesModule {}
