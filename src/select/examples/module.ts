import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThyIconModule } from 'ngx-tethys/icon';
import { THY_SELECT_SCROLL_STRATEGY, ThySelectModule } from 'ngx-tethys/select';
import { ThyOptionModule } from 'ngx-tethys/shared';
import { ThyButtonModule } from 'ngx-tethys/button';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThySelectAutoExpendExampleComponent } from './auto-expend/auto-expend.component';
import { ThySelectBasicExampleComponent } from './basic/basic.component';
import { ThySelectCustomBasicExampleComponent } from './custom-basic/custom-basic.component';
import { ThySelectTopDisplayExampleComponent } from './top-display/top-display.component';
import { ThySelectEmptyOptionExampleComponent } from './empty-option/empty-option.component';
import { ThySelectFooterExampleComponent } from './footer/footer.component';
import { ThySelectGroupExampleComponent } from './group/group.component';
import { ThySelectScrollLoadExampleComponent } from './scroll-load/scroll-load.component';
import { ThySelectServerSearchExampleComponent } from './server-search/server-search.component';
import { ThySelectSearchExampleComponent } from './search/search.component';
import { ThySelectMultipleExampleComponent } from './multiple/multiple.component';
import { ThySelectSizeExampleComponent } from './size/size.component';

const COMPONENTS = [
    ThySelectBasicExampleComponent,
    ThySelectCustomBasicExampleComponent,
    ThySelectEmptyOptionExampleComponent,
    ThySelectTopDisplayExampleComponent,
    ThySelectScrollLoadExampleComponent,
    ThySelectGroupExampleComponent,
    ThySelectServerSearchExampleComponent,
    ThySelectFooterExampleComponent,
    ThySelectAutoExpendExampleComponent,
    ThySelectSearchExampleComponent,
    ThySelectMultipleExampleComponent,
    ThySelectSizeExampleComponent
];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,
        ThySelectModule,
        ThyOptionModule,
        ThyCheckboxModule,
        ThyIconModule,
        ThyButtonModule
    ],
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
