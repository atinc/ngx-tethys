import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyRadioBasicExampleComponent } from './basic/basic.component';
import { ThyRadioDisabledExampleComponent } from './disabled/disabled.component';
import { ThyRadioToggleInlineExampleComponent } from './toggle-inline/toggle-inline.component';
import { ThyRadioGroupExampleComponent } from './group/group.component';
import { ThyRadioGroupButtonExampleComponent } from './group-button/group-button.component';

const COMPONENTS = [
    ThyRadioBasicExampleComponent,
    ThyRadioDisabledExampleComponent,
    ThyRadioToggleInlineExampleComponent,
    ThyRadioGroupExampleComponent,
    ThyRadioGroupButtonExampleComponent
];
@NgModule({
    imports: [CommonModule, FormsModule, NgxTethysModule],
    exports: COMPONENTS,
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    providers: []
})
export class ThyRadioExamplesModule {}
