import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyColorPickerModule } from 'ngx-tethys/color-picker';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThySpaceModule } from 'ngx-tethys/space';

import { ThyBasicExampleComponent } from './basic/basic.component';
import { ThyDefaultColorExampleComponent } from './default-color/default-color.component';
import { ThyDisableTransparentColorExampleComponent } from './disable-transparent-color/disable-transparent-color.component';
import { ThyPlacementExampleComponent } from './placement/placement.component';
import { ThyPresetColorsExampleComponent } from './preset-colors/preset-colors.component';
import { ThyTriggerExampleComponent } from './trigger/trigger.component';
import { ThyColorPickerDisableExampleComponent } from './disabled/disabled.component';

const COMPONENTS = [
    ThyBasicExampleComponent,
    ThyDefaultColorExampleComponent,
    ThyPresetColorsExampleComponent,
    ThyDisableTransparentColorExampleComponent,
    ThyPlacementExampleComponent,
    ThyTriggerExampleComponent,
    ThyColorPickerDisableExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyDialogModule, ThyColorPickerModule, ThySpaceModule],
    exports: [...COMPONENTS]
})
export class ThyColorPickerExamplesModule {}
