import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyProperties } from './properties.component';
import { ThyPropertyItem } from './property-item.component';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';

@NgModule({
    imports: [CommonModule, ThyFlexibleTextModule, ThyTooltipModule, ThyProperties, ThyPropertyItem],
    exports: [ThyProperties, ThyPropertyItem]
})
export class ThyPropertyModule {}
