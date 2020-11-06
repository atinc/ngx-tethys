import { NgxTethysModule, THY_NOTIFY_DEFAULT_OPTIONS } from 'ngx-tethys';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyNotifyBasicExampleComponent } from './basic/basic.component';
import { ThyNotifyCustomHtmlExampleComponent } from './custom-html/custom-html.component';
import { ThyNotifyDetailExampleComponent } from './detail/detail.component';
import { ThyNotifyHoverExampleComponent } from './hover/hover.component';
import { ThyNotifyTypeExampleComponent } from './type/type.component';
import { ThyNotifyPlacementExampleComponent } from './placement/placement.component';

const COMPONENTS = [
    ThyNotifyHoverExampleComponent,
    ThyNotifyDetailExampleComponent,
    ThyNotifyCustomHtmlExampleComponent,
    ThyNotifyBasicExampleComponent,
    ThyNotifyTypeExampleComponent,
    ThyNotifyPlacementExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, NgxTethysModule],
    exports: [...COMPONENTS],
    providers: [
        {
            provide: THY_NOTIFY_DEFAULT_OPTIONS,
            useValue: {
                placement: 'topRight'
            }
        }
    ]
})
export class ThyNotifyExamplesModule {}
