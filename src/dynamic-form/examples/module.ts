import { ThyDynamicFormModule } from 'ngx-tethys/dynamic-form';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyDynamicFormBasicExampleComponent } from './basic/basic.component';

const COMPONENTS = [ThyDynamicFormBasicExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, ThyDynamicFormModule, ThyInputModule],
    exports: COMPONENTS,
    providers: []
})
export class ThyWatermarkExamplesModule {}
