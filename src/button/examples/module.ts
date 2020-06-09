import { NgModule } from '@angular/core';
import { ThyButtonBasicExampleComponent } from './basic/basic.component';
import { ThyButtonPairExampleComponent } from './pair/pair.component';
import { ThyButtonIconExampleComponent } from './icon/icon.component';
import { ThyButtonLinkExampleComponent } from './link/link.component';
import { ThyButtonSizeExampleComponent } from './size/size.component';
import { ThyButtonOutlineExampleComponent } from './outline/outline.component';
import { ThyButtonSquareExampleComponent } from './square/square.component';
import { ThyButtonLoadingExampleComponent } from './loading/loading.component';
import { ThyButtonGroupExampleComponent } from './group/group.component';
import { ThyButtonModule } from 'ngx-tethys/button';

const COMPONENTS = [
    ThyButtonBasicExampleComponent,
    ThyButtonPairExampleComponent,
    ThyButtonIconExampleComponent,
    ThyButtonLinkExampleComponent,
    ThyButtonSizeExampleComponent,
    ThyButtonOutlineExampleComponent,
    ThyButtonSquareExampleComponent,
    ThyButtonLoadingExampleComponent,
    ThyButtonGroupExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [ThyButtonModule],
    exports: [...COMPONENTS]
})
export class ThyButtonExamplesModule {}
