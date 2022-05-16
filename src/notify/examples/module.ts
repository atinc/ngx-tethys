import { ThyNotifyModule } from 'ngx-tethys/notify';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyNotifyBasicExampleComponent } from './basic/basic.component';
import { ThyNotifyCustomHtmlExampleComponent } from './custom-html/custom-html.component';
import { ThyNotifyDetailExampleComponent } from './detail/detail.component';
import { ThyNotifyHoverExampleComponent } from './hover/hover.component';
import { ThyNotifyTypeExampleComponent } from './type/type.component';
import { ThyNotifyPlacementExampleComponent } from './placement/placement.component';
import { ThyNotifyDetailOperationExampleComponent } from './detail-operation/detail-operation.component';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThySpaceModule } from 'ngx-tethys';
import { ThyNotifyCloseExampleComponent } from './close/close.component';

const COMPONENTS = [
    ThyNotifyHoverExampleComponent,
    ThyNotifyDetailExampleComponent,
    ThyNotifyDetailOperationExampleComponent,
    ThyNotifyCustomHtmlExampleComponent,
    ThyNotifyBasicExampleComponent,
    ThyNotifyTypeExampleComponent,
    ThyNotifyPlacementExampleComponent,
    ThyNotifyCloseExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, ThyButtonModule, ThySpaceModule, ThyNotifyModule],
    exports: [...COMPONENTS],
    providers: []
})
export class ThyNotifyExamplesModule {}
