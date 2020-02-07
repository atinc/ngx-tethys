import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThyTimePickerComponent } from './time-picker.component';
import { TimePickerConfig } from './time-picker.config';
import { ThyTimePickerStore } from './time-picker.store';

@NgModule({
    imports: [CommonModule],
    declarations: [ThyTimePickerComponent],
    exports: [ThyTimePickerComponent],
    providers: [TimePickerConfig, ThyTimePickerStore]
})
export class ThyTimePickerModule {}
