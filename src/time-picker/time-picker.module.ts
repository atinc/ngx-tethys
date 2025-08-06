import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyPopoverModule } from 'ngx-tethys/popover';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyInnerTimePicker } from './inner/inner-time-picker.component';
import { TimePickerConfig } from './inner/inner-time-picker.config';
import { ThyTimePickerStore } from './inner/inner-time-picker.store';
import { ThyTimePanel } from './time-picker-panel.component';
import { ThyTimePicker } from './time-picker.component';

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
