import { ThyButtonModule } from 'ngx-tethys/button';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThySpaceModule } from 'ngx-tethys/space';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThySpaceAlignExampleComponent } from './align/align.component';
import { ThySpaceBasicExampleComponent } from './basic/basic.component';
import { ThySpaceSizeExampleComponent } from './size/size.component';
import { ThySpaceVerticalExampleComponent } from './vertical/vertical.component';

const COMPONENTS = [
    ThySpaceBasicExampleComponent,
    ThySpaceSizeExampleComponent,
    ThySpaceVerticalExampleComponent,
    ThySpaceAlignExampleComponent
];

@NgModule({
    imports: [CommonModule, ThyButtonModule, ThySpaceModule, ThySharedModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS]
})
export class ThySpaceExamplesModule {}
