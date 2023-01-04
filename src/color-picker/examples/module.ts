import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyColorPickerModule } from 'ngx-tethys/color-picker';
import { ThyDialogModule } from 'ngx-tethys/dialog';

import { ThyBasicExampleComponent } from './basic/basic.component';
import { ThyDefaultColorExampleComponent } from './default-color/default-color.component';
import { ThyDisableTransparentColorExampleComponent } from './disable-transparent-color/disable-transparent-color.component';
import { ThyPresetColorsExampleComponent } from './preset-colors/preset-colors.component';

const COMPONENTS = [
    ThyBasicExampleComponent,
    ThyDefaultColorExampleComponent,
    ThyPresetColorsExampleComponent,
    ThyDisableTransparentColorExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyDialogModule, ThyColorPickerModule],
    exports: [...COMPONENTS]
})
export class ThyColorPickerExamplesModule {}
