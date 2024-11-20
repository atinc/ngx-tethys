import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyGridModule } from 'ngx-tethys/grid';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ThyEmptyBasicExampleComponent } from './basic/basic.component';
import { ThyEmptyContainerExampleComponent } from './container/container.component';
import { ThyEmptyCustomizeExampleComponent } from './customize/customize.component';
import { ThyEmptyIconExampleComponent } from './icon/icon.component';
import { ThyEmptyImgExampleComponent } from './img/img.component';
import { ThyEmptyMarginTopExampleComponent } from './margin-top/margin-top.component';
import { ThyEmptyMessageExampleComponent } from './message/message.component';
import { ThyEmptySizeExampleComponent } from './size/size.component';
import { ThyEmptyTopExampleComponent } from './top/top.component';

const COMPONENTS = [
    ThyEmptyBasicExampleComponent,
    ThyEmptySizeExampleComponent,
    ThyEmptyTopExampleComponent,
    ThyEmptyMessageExampleComponent,
    ThyEmptyIconExampleComponent,
    ThyEmptyImgExampleComponent,
    ThyEmptyCustomizeExampleComponent,
    ThyEmptyContainerExampleComponent,
    ThyEmptyMarginTopExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, FormsModule, TranslateModule.forRoot(), TranslateModule, ThyEmptyModule, ThyButtonModule, ThyGridModule],
    exports: [...COMPONENTS]
})
export class ThyEmptyExamplesModule {}
