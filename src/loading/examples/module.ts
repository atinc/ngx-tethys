import { NgxTethysModule } from 'ngx-tethys';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyLoadingBasicExampleComponent } from './basic/basic.component';
import { ThyLoadingMaskExampleComponent } from './mask/mask.component';
import { ThyLoadingTipExampleComponent } from './tip/tip.component';

const COMPONENTS = [ThyLoadingMaskExampleComponent, ThyLoadingBasicExampleComponent, ThyLoadingTipExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, NgxTethysModule],
    entryComponents: COMPONENTS,
    exports: COMPONENTS,
    providers: []
})
export class ThyLoadingExamplesModule {}
