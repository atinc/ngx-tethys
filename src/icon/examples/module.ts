import { ThyIconModule } from 'ngx-tethys/icon';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyIconBasicExampleComponent } from './basic/basic.component';
import { ThyIconLeggingExampleComponent } from './legging/legging.component';
import { ThyIconRotateExampleComponent } from './rotate/rotate.component';
import { ThyIconTwotoneExampleComponent } from './twotone/twotone.component';

const COMPONENTS = [
    ThyIconBasicExampleComponent,
    ThyIconLeggingExampleComponent,
    ThyIconRotateExampleComponent,
    ThyIconTwotoneExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, ThyIconModule],
    exports: [...COMPONENTS],
    providers: []
})
export class ThyIconExamplesModule {}
