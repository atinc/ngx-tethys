import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ThyTooltipDirective } from './tooltip.directive';
import { ThyTooltipComponent } from './tooltip.component';
import { THY_TOOLTIP_DEFAULT_CONFIG_PROVIDER } from './tooltip.config';
import { TooltipService } from './tooltip.service';

@NgModule({
    imports: [A11yModule, CommonModule, OverlayModule],
    exports: [ThyTooltipDirective],
    declarations: [ThyTooltipDirective, ThyTooltipComponent],
    entryComponents: [ThyTooltipComponent],
    providers: [THY_TOOLTIP_DEFAULT_CONFIG_PROVIDER, TooltipService]
})
export class ThyTooltipModule {}
