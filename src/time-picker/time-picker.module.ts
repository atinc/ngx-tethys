import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThyInnerTimePickerComponent } from './inner/inner-time-picker.component';
import { TimePickerConfig } from './inner/inner-time-picker.config';
import { ThyTimePickerStore } from './inner/inner-time-picker.store';

@NgModule({
    imports: [CommonModule],
    declarations: [ThyInnerTimePickerComponent],
    exports: [ThyInnerTimePickerComponent],
    providers: [TimePickerConfig, ThyTimePickerStore]
})
export class ThyTimePickerModule {}
