import { ThyWatermarkModule } from 'ngx-tethys/watermark';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyInputModule } from 'ngx-tethys/input';

import { ThyWatermarkBasicExampleComponent } from './basic/basic.component';
import { ThyWatermarkCanvasCustomExampleComponent } from './custom/custom.component';

const COMPONENTS = [ThyWatermarkBasicExampleComponent, ThyWatermarkCanvasCustomExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, ThyWatermarkModule, ThyInputModule],
    exports: COMPONENTS,
    providers: []
})
export class ThyWatermarkExamplesModule {}
