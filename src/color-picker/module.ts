import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyColorPickerDirective } from './color-picker.component';
import { ThyPickerPanelComponent } from './picker-panel.component';
import { ThySaturationComponent } from './parts/saturation/saturation.component';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyHueComponent } from './parts/hue/hue.component';
import { ThyAlphaComponent } from './parts/alpha/alpha.component';
import { ThyIndicatorComponent } from './parts/indicator/indicator.component';
import { ThyCoordinatesDirective } from './helpers/coordinates.directive';
import { ThyDefaultPanelComponent } from './default-panel.component';
import { ThyColorInputsComponent } from './parts/inputs/inputs.component';
import { FormsModule } from '@angular/forms';
import { ThyInputNumberModule } from 'ngx-tethys/input-number';
import { ThySharedModule } from 'ngx-tethys/shared';

@NgModule({
    imports: [CommonModule, ThyDialogModule, ThyInputModule, ThyIconModule, FormsModule, ThyInputNumberModule, ThySharedModule],
    declarations: [
        ThyColorPickerDirective,
        ThyPickerPanelComponent,
        ThySaturationComponent,
        ThyHueComponent,
        ThyAlphaComponent,
        ThyIndicatorComponent,
        ThyCoordinatesDirective,
        ThyDefaultPanelComponent,
        ThyColorInputsComponent
    ],
    exports: [ThyColorPickerDirective]
})
export class ThyColorPickerModule {}
