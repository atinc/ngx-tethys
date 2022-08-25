import { ThyDatePickerModule } from 'ngx-tethys/date-picker';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyPropertiesComponent } from './properties.component';
import { ThyPropertyItemComponent } from './property-item.component';

@NgModule({
    declarations: [ThyPropertiesComponent, ThyPropertyItemComponent],
    imports: [CommonModule, ThyDatePickerModule, ThyFlexibleTextModule],
    exports: [ThyPropertiesComponent, ThyPropertyItemComponent]
})
export class ThyPropertyModule {}
