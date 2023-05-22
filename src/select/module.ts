import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyLabelModule } from 'ngx-tethys/label';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyOptionModule, ThySelectCommonModule, ThySharedModule } from 'ngx-tethys/shared';

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThySelectCustomComponent } from './custom-select/custom-select.component';
import { ThySelectComponent } from './select.component';
import { THY_SELECT_CONFIG_PROVIDER, THY_SELECT_SCROLL_STRATEGY_PROVIDER } from './select.config';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyInputModule,
        ThyLabelModule,
        OverlayModule,
        ThyLoadingModule,
        ThySharedModule,
        ThyIconModule,
        ThyEmptyModule,
        ThySelectCommonModule,
        ThyOptionModule,
        ThySelectComponent,
        ThySelectCustomComponent
    ],
    exports: [ThySelectComponent, ThySelectCustomComponent, ThyOptionModule],
    providers: [THY_SELECT_SCROLL_STRATEGY_PROVIDER, THY_SELECT_CONFIG_PROVIDER]
})
export class ThySelectModule {}
