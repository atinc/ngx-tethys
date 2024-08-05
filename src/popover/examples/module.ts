import { ThyDropdownModule } from 'ngx-tethys/dropdown';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyNavModule } from 'ngx-tethys/nav';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThyActionModule } from 'ngx-tethys/action';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThySelectModule } from 'ngx-tethys/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyPopoverBasicContentComponent } from './basic/popover-content.component';
import { ThyPopoverAutoAdaptiveContentComponent } from './auto-adaptive/auto-adaptive-content.component';
import { ThyPopoverManualContentComponent } from './manual/popover-content.component';
import { ThyPopoverPassDataContentComponent } from './pass-data/popover-content.component';
import { ThyPopoverDisabledAnimationExampleComponent } from './disabled-animation/disabled-animation.component';
import { ThyPopoverCanPushExampleComponent } from './can-push/can-push.component';

export default {
    declarations: [
        ThyPopoverBasicContentComponent,
        ThyPopoverManualContentComponent,
        ThyPopoverAutoAdaptiveContentComponent,
        ThyPopoverPassDataContentComponent,
        ThyPopoverDisabledAnimationExampleComponent,
        ThyPopoverCanPushExampleComponent
    ],
    imports: [
        CommonModule,
        ThyButtonModule,
        ThyFormModule,
        ThySelectModule,
        ThyIconModule,
        ThyActionModule,
        ThySpaceModule,
        ThyDropdownModule,
        ThyPopoverModule,
        ThyNavModule,
        FormsModule,
        ThyInputModule
    ]
    // providers: [
    //     {
    //         provide: THY_POPOVER_SCROLL_STRATEGY,
    //         deps: [Overlay],
    //         useFactory: (overlay: Overlay) => {
    //             return () => overlay.scrollStrategies.close();
    //         }
    //     }
    // ]
};
