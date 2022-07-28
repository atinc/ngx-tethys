import { ThyWatermarkModule } from 'ngx-tethys/watermark';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyWatermarkBasicExampleComponent } from './basic/basic.component';
import { ThyWatermarkMustExampleComponent } from './must/must.component';

const COMPONENTS = [ThyWatermarkBasicExampleComponent, ThyWatermarkMustExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, ThyWatermarkModule],
    exports: COMPONENTS,
    providers: []
})
export class ThyWatermarkExamplesModule {}
