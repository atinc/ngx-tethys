import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThyIconModule } from 'ngx-tethys/icon';
import { THY_SELECT_SCROLL_STRATEGY, ThySelectModule } from 'ngx-tethys/select';
import { ThyOptionModule } from 'ngx-tethys/shared';

import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThySelectAutoExpendExampleComponent } from './auto-expend/auto-expend.component';
import { ThySelectBasicExampleComponent } from './basic/basic.component';
import { ThySelectCustomBasicExampleComponent } from './custom-basic/custom-basic.component';
import { ThySelectDisplayExampleComponent } from './display/display.component';
import { ThySelectEmptyExampleComponent } from './empty/empty.component';
import { ThySelectFooterExampleComponent } from './footer/footer.component';
import { ThySelectGroupExampleComponent } from './group/group.component';
import { ThySelectScrollLoadExampleComponent } from './scroll-load/scroll-load.component';
import { ThySelectServerSearchExampleComponent } from './server-search/server-search.component';

const COMPONENTS = [
    ThySelectBasicExampleComponent,
    ThySelectCustomBasicExampleComponent,
    ThySelectEmptyExampleComponent,
    ThySelectDisplayExampleComponent,
    ThySelectScrollLoadExampleComponent,
    ThySelectGroupExampleComponent,
    ThySelectServerSearchExampleComponent,
    ThySelectFooterExampleComponent,
    ThySelectAutoExpendExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [CommonModule, FormsModule, OverlayModule, ThySelectModule, ThyOptionModule, ThyCheckboxModule, ThyIconModule],
    exports: COMPONENTS,
    providers: [
        {
            provide: THY_SELECT_SCROLL_STRATEGY,
            deps: [Overlay],
            useFactory: (overlay: Overlay) => {
                return () => overlay.scrollStrategies.close();
            }
        }
    ]
})
export class ThySelectExamplesModule {}
