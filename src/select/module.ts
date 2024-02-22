import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyOptionModule, ThySelectCommonModule, ThySharedModule } from 'ngx-tethys/shared';
import { ThySelectCustom } from './custom-select/custom-select.component';
import { ThySelect } from './select.component';
import { THY_SELECT_CONFIG_PROVIDER, THY_SELECT_SCROLL_STRATEGY_PROVIDER } from './select.config';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyInputModule,
        OverlayModule,
        ThyLoadingModule,
        ThySharedModule,
        ThyIconModule,
        ThyEmptyModule,
        ThySelectCommonModule,
        ThyOptionModule,
        ThySelect,
        ThySelectCustom
    ],
    exports: [ThySelect, ThySelectCustom, ThyOptionModule],
    providers: [THY_SELECT_SCROLL_STRATEGY_PROVIDER, THY_SELECT_CONFIG_PROVIDER]
})
export class ThySelectModule {}
