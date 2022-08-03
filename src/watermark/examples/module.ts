import { ThyWatermarkModule } from 'ngx-tethys/watermark';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThySwitchModule } from 'ngx-tethys/switch';

import { ThyWatermarkBasicExampleComponent } from './basic/basic.component';
import { ThyWatermarkTextareaExampleComponent } from './textarea/textarea.component';

const COMPONENTS = [ThyWatermarkBasicExampleComponent, ThyWatermarkTextareaExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, ThyWatermarkModule, ThyGridModule, ThySwitchModule],
    exports: COMPONENTS,
    providers: []
})
export class ThyWatermarkExamplesModule {}
