import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyColorPickerModule } from 'ngx-tethys/color-picker';
import { ThyDialogModule } from 'ngx-tethys/dialog';
import { ThyButtonModule } from 'ngx-tethys/button';

import { ThyBasicExampleComponent } from './basic/basic.component';

const COMPONENTS = [ThyBasicExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyDialogModule, ThyColorPickerModule, ThyButtonModule],
    exports: [...COMPONENTS]
})
export class ThyColorPickerExamplesModule {}
