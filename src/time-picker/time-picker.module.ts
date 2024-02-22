import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThyInnerTimePicker } from './inner/inner-time-picker.component';
import { TimePickerConfig } from './inner/inner-time-picker.config';
import { ThyTimePickerStore } from './inner/inner-time-picker.store';
import { ThyTimePicker } from './time-picker.component';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyTimePanel } from './time-picker-panel.component';
import { ThyButtonModule } from 'ngx-tethys/button';

const COMPONENTS = [ThyInnerTimePicker, ThyTimePicker, ThyTimePanel];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThySharedModule,
        ThyIconModule,
        ThyInputModule,
        OverlayModule,
        ThyPopoverModule,
        ThyButtonModule,
        ...COMPONENTS
    ],
    exports: [...COMPONENTS],
    providers: [TimePickerConfig, ThyTimePickerStore]
})
export class ThyTimePickerModule {}
