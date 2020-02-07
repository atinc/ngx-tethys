import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimePickerComponent } from './time-picker.component';
import { TimePickerConfig } from './time-picker.config';
import { ThyTimePickerStore } from './time-picker.store';

@NgModule({
    imports: [CommonModule],
    declarations: [TimePickerComponent],
    exports: [TimePickerComponent],
    providers: [TimePickerConfig, ThyTimePickerStore]
})
export class ThyTimePickerModule {}
