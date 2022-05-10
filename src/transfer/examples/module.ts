import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThyListModule } from 'ngx-tethys/list';
import { ThyTransferModule } from 'ngx-tethys/transfer';
import { ThyIconModule } from 'ngx-tethys/icon';
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
