import { ThyDatePickerModule } from 'ngx-tethys/date-picker';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyPropertiesComponent } from './properties.component';
import { ThyPropertyItemComponent } from './property-item.component';

@NgModule({
    declarations: [ThyPropertiesComponent, ThyPropertyItemComponent],
    imports: [CommonModule, ThyDatePickerModule],
    exports: [ThyPropertiesComponent, ThyPropertyItemComponent]
})
export class ThyPropertyModule {}
