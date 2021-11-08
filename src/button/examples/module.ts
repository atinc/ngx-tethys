import { ThyButtonModule } from 'ngx-tethys/button';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThyIconModule } from 'ngx-tethys/icon';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyButtonBasicExampleComponent } from './basic/basic.component';
import { ThyButtonBlockExampleComponent } from './block/block.component';
import { ThyButtonGroupExampleComponent } from './group/group.component';
import { ThyButtonIconExampleComponent } from './icon/icon.component';
import { ThyButtonLinkExampleComponent } from './link/link.component';
import { ThyButtonLoadingExampleComponent } from './loading/loading.component';
import { ThyButtonOutlineExampleComponent } from './outline/outline.component';
import { ThyButtonPairExampleComponent } from './pair/pair.component';
import { ThyButtonSizeExampleComponent } from './size/size.component';

const COMPONENTS = [
    ThyButtonBasicExampleComponent,
    ThyButtonPairExampleComponent,
    ThyButtonIconExampleComponent,
    ThyButtonLinkExampleComponent,
    ThyButtonSizeExampleComponent,
    ThyButtonOutlineExampleComponent,
    ThyButtonLoadingExampleComponent,
    ThyButtonGroupExampleComponent,
    ThyButtonBlockExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, ThyButtonModule, ThyIconModule, ThySpaceModule],
    exports: [...COMPONENTS]
})
export class ThyButtonExamplesModule {}
