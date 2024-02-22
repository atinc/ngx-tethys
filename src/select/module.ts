import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyOptionModule, ThySelectCommonModule, ThySharedModule } from 'ngx-tethys/shared';
import { ThySelect } from './select.component';
import { ThyNativeSelect } from './native-select/native-select.component';
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
        ThyNativeSelect,
        ThySelect
    ],
    exports: [ThyNativeSelect, ThySelect, ThyOptionModule],
    providers: [THY_SELECT_SCROLL_STRATEGY_PROVIDER, THY_SELECT_CONFIG_PROVIDER]
})
export class ThySelectModule {}
