import { THY_POPOVER_SCROLL_STRATEGY } from 'ngx-tethys/popover';

import { Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyIconModule } from 'ngx-tethys/icon';

import { ThyPopoverBasicExampleComponent } from './basic/basic.component';
import { ThyPopoverBasicContentComponent } from './basic/popover-content.component';
import { ThyPopoverDirectiveExampleComponent } from './directive/directive.component';
import { ThyPopoverAutoAdaptiveContentComponent } from './auto-adaptive/auto-adaptive-content.component';
import { ThyPopoverAutoAdaptiveExampleComponent } from './auto-adaptive/auto-adaptive.component';

const COMPONENTS = [
    ThyPopoverBasicContentComponent,
    ThyPopoverBasicExampleComponent,
    ThyPopoverDirectiveExampleComponent,
    ThyPopoverAutoAdaptiveContentComponent,
    ThyPopoverAutoAdaptiveExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, ThyButtonModule, ThyFormModule, ThySelectModule, ThyIconModule, FormsModule],
    entryComponents: COMPONENTS,
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
