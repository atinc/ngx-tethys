import { NgxTethysModule } from 'ngx-tethys';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyNotifyBasicExampleComponent } from './basic/basic.component';
import { ThyNotifyCustomHtmlExampleComponent } from './custom-html/custom-html.component';
import { ThyNotifyDetailExampleComponent } from './detail/detail.component';
import { ThyNotifyHoverExampleComponent } from './hover/hover.component';
import { ThyNotifyTypeExampleComponent } from './type/type.component';

const COMPONENTS = [
    ThyNotifyHoverExampleComponent,
    ThyNotifyDetailExampleComponent,
    ThyNotifyCustomHtmlExampleComponent,
    ThyNotifyBasicExampleComponent,
    ThyNotifyTypeExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, NgxTethysModule],
    exports: [...COMPONENTS]
})
export class ThyNotifyExamplesModule {}
