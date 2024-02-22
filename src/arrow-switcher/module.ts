import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyArrowSwitcher } from './arrow-switcher.component';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyActionModule } from 'ngx-tethys/action';

@NgModule({
    imports: [CommonModule, ThyButtonModule, ThyIconModule, ThyActionModule, ThyTooltipModule, ThyArrowSwitcher],
    exports: [ThyArrowSwitcher]
})
export class ThyArrowSwitcherModule {}
