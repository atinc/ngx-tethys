import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyTooltipBasicExampleComponent } from './basic/basic.component';
import { ThyTooltipTemplateExampleComponent } from './template/template.component';
import { ThyTooltipTemplateDataExampleComponent } from './template-data/template-data.component';

const COMPONENTS = [ThyTooltipBasicExampleComponent, ThyTooltipTemplateExampleComponent, ThyTooltipTemplateDataExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule],
    entryComponents: COMPONENTS,
    exports: COMPONENTS,
    providers: []
})
export class ThyTooltipExamplesModule {}
