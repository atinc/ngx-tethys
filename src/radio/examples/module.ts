import { NgxTethysModule } from 'ngx-tethys';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyRadioBasicExampleComponent } from './basic/basic.component';
import { ThyRadioDisabledExampleComponent } from './disabled/disabled.component';
import { ThyRadioGroupButtonExampleComponent } from './group-button/group-button.component';
import { ThyRadioGroupExampleComponent } from './group/group.component';
import { ThyRadioSizeExampleComponent } from './size/size.component';
import { ThyRadioToggleInlineExampleComponent } from './toggle-inline/toggle-inline.component';

const COMPONENTS = [
    ThyRadioBasicExampleComponent,
    ThyRadioDisabledExampleComponent,
    ThyRadioToggleInlineExampleComponent,
    ThyRadioGroupExampleComponent,
    ThyRadioGroupButtonExampleComponent,
    ThyRadioSizeExampleComponent
];
@NgModule({
    imports: [CommonModule, FormsModule, NgxTethysModule],
    exports: COMPONENTS,
    declarations: COMPONENTS,
    providers: []
})
export class ThyRadioExamplesModule {}
