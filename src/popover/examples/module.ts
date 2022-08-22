import { ThyActionMenuModule } from 'ngx-tethys/action-menu';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyNavModule } from 'ngx-tethys/nav';
import { THY_POPOVER_SCROLL_STRATEGY, ThyPopoverModule } from 'ngx-tethys/popover';
import { ThySelectModule } from 'ngx-tethys/select';

import { Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyPopoverAutoAdaptiveContentComponent } from './auto-adaptive/auto-adaptive-content.component';
import { ThyPopoverAutoAdaptiveExampleComponent } from './auto-adaptive/auto-adaptive.component';
import { ThyPopoverBasicExampleComponent } from './basic/basic.component';
import { ThyPopoverBasicContentComponent } from './basic/popover-content.component';
import { ThyPopoverDirectiveExampleComponent } from './directive/directive.component';

const COMPONENTS = [
    ThyPopoverBasicContentComponent,
    ThyPopoverBasicExampleComponent,
    ThyPopoverDirectiveExampleComponent,
    ThyPopoverAutoAdaptiveContentComponent,
    ThyPopoverAutoAdaptiveExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [
        CommonModule,
        ThyButtonModule,
        ThyFormModule,
        ThySelectModule,
        ThyIconModule,
        ThyActionMenuModule,
        ThyPopoverModule,
        ThyNavModule,
        FormsModule,
        ThyInputModule
    ],
    exports: COMPONENTS,
    providers: [
        {
            provide: THY_POPOVER_SCROLL_STRATEGY,
            deps: [Overlay],
            useFactory: (overlay: Overlay) => {
                return () => overlay.scrollStrategies.close();
            }
        }
    ]
})
export class ThyPopoverExamplesModule {}
