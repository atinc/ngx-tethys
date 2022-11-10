import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyColorPickerModule } from 'ngx-tethys/color-picker';
import { ThyDialogModule } from 'ngx-tethys/dialog';

import { ThyBasicExampleComponent } from './basic/basic.component';
import { ThyDefaultColorExampleComponent } from './default-color/default-color.component';

const COMPONENTS = [ThyBasicExampleComponent, ThyDefaultColorExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyDialogModule, ThyColorPickerModule],
    exports: [...COMPONENTS]
})
export class ThyColorPickerExamplesModule {}
