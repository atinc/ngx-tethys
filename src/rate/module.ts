import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ThyRateItem } from './rate-item.component';
import { ThyRate } from './rate.component';

@NgModule({
    imports: [CommonModule, FormsModule, ThySharedModule, ThyIconModule, ThyTooltipModule, ThyRate, ThyRateItem],
    exports: [ThyRate],
    providers: []
})
export class ThyRateModule {}
