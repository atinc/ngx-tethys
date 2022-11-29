import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThyIconModule } from 'ngx-tethys/icon';
import { THY_SELECT_SCROLL_STRATEGY, ThySelectModule } from 'ngx-tethys/select';
import { ThyOptionModule } from 'ngx-tethys/shared';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyTypographyModule } from 'ngx-tethys/typography';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export default {
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,
        ThySelectModule,
        ThyOptionModule,
        ThyCheckboxModule,
        ThyIconModule,
        ThyButtonModule,
        ThyTypographyModule
    ],
    providers: [
        {
            provide: THY_SELECT_SCROLL_STRATEGY,
            deps: [Overlay],
            useFactory: (overlay: Overlay) => {
                return () => overlay.scrollStrategies.close();
            }
        }
    ]
};
