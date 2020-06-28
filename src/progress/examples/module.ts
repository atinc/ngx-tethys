import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyProgressBasicExampleComponent } from './basic/basic.component';
import { ThyProgressStackedExampleComponent } from './stacked/stacked.component';
import { ThyProgressTemplateExampleComponent } from './template/template.component';

const COMPONENTS = [ThyProgressBasicExampleComponent, ThyProgressStackedExampleComponent, ThyProgressTemplateExampleComponent];

@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FormsModule, NgxTethysModule],
    entryComponents: COMPONENTS,
    exports: COMPONENTS,
    providers: []
})
export class ThyProgressExamplesModule {}
