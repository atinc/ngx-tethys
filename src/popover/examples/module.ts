import { NgxTethysModule, THY_POPOVER_SCROLL_STRATEGY } from 'ngx-tethys';

import { Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyPopoverBasicExampleComponent } from './basic/basic.component';
import { ThyPopoverBasicContentComponent } from './basic/popover-content.component';
import { ThyPopoverDirectiveExampleComponent } from './directive/directive.component';

const COMPONENTS = [ThyPopoverBasicContentComponent, ThyPopoverBasicExampleComponent, ThyPopoverDirectiveExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, NgxTethysModule, FormsModule],
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
