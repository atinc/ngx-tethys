import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyPropertiesComponent } from './properties.component';
import { ThyPropertyItemComponent } from './property-item.component';

@NgModule({
    declarations: [ThyPropertiesComponent, ThyPropertyItemComponent],
    imports: [CommonModule],
    exports: [ThyPropertiesComponent, ThyPropertyItemComponent]
})
export class ThyPropertyModule {}
