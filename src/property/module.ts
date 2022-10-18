import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyPropertiesComponent } from './properties.component';
import { ThyPropertyItemComponent } from './property-item.component';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';

@NgModule({
    declarations: [ThyPropertiesComponent, ThyPropertyItemComponent],
    imports: [CommonModule, ThyFlexibleTextModule, ThyTooltipModule],
    exports: [ThyPropertiesComponent, ThyPropertyItemComponent]
})
export class ThyPropertyModule {}
