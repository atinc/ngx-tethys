import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThyInnerTimePickerComponent } from './time-picker.component';
import { TimePickerConfig } from './time-picker.config';
import { ThyTimePickerStore } from './time-picker.store';

@NgModule({
    imports: [CommonModule],
    declarations: [ThyInnerTimePickerComponent],
    exports: [ThyInnerTimePickerComponent],
    providers: [TimePickerConfig, ThyTimePickerStore]
})
export class ThyInnerTimePickerModule {}
