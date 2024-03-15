import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyColorPickerDirective } from './color-picker.component';
import { ThyColorPickerCustomPanel } from './color-picker-custom-panel.component';
import { ThySaturation } from './parts/saturation/saturation.component';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyHue } from './parts/hue/hue.component';
import { ThyAlpha } from './parts/alpha/alpha.component';
import { ThyIndicator } from './parts/indicator/indicator.component';
import { ThyCoordinatesDirective } from './coordinates.directive';
import { ThyColorPickerPanel } from './color-picker-panel.component';
import { ThyColorInputs } from './parts/inputs/inputs.component';
import { FormsModule } from '@angular/forms';
import { ThyInputNumberModule } from 'ngx-tethys/input-number';
import { ThySharedModule } from 'ngx-tethys/shared';

@NgModule({
    imports: [
        CommonModule,
        ThyDialogModule,
        ThyInputModule,
        ThyIconModule,
        FormsModule,
        ThyInputNumberModule,
        ThySharedModule,
        ThyColorPickerDirective,
        ThyColorPickerCustomPanel,
        ThySaturation,
        ThyHue,
        ThyAlpha,
        ThyIndicator,
        ThyCoordinatesDirective,
        ThyColorPickerPanel,
        ThyColorInputs
    ],
    exports: [ThyColorPickerDirective]
})
export class ThyColorPickerModule {}
