import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThyListModule, ThyTransferModule, ThyIconModule } from 'ngx-tethys';
import { ThyTransferBasicExampleComponent } from './basic/basic.component';
import { ThyTransferTemplateExampleComponent } from './template/template.component';

const COMPONENTS = [ThyTransferBasicExampleComponent, ThyTransferTemplateExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ThyTransferModule, ThyListModule, ThyIconModule],
    exports: [...COMPONENTS]
})
export class ThyTransferExamplesModule {}
