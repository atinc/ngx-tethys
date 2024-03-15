import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyTooltipDirective } from './tooltip.directive';
import { ThyTooltip } from './tooltip.component';
import { THY_TOOLTIP_DEFAULT_CONFIG_PROVIDER } from './tooltip.config';

@NgModule({
    imports: [A11yModule, CommonModule, OverlayModule, ThyTooltipDirective, ThyTooltip],
    exports: [ThyTooltipDirective],
    providers: [THY_TOOLTIP_DEFAULT_CONFIG_PROVIDER]
})
export class ThyTooltipModule {}
