import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';
import { ThyPropertiesComponent } from './properties.component';
import { ThyPropertyItemComponent } from './property-item.component';

@NgModule({
    declarations: [ThyPropertiesComponent, ThyPropertyItemComponent],
    imports: [CommonModule, ThyFlexibleTextModule],
    exports: [ThyPropertiesComponent, ThyPropertyItemComponent]
})
export class ThyPropertyModule {}
