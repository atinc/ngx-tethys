import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared.module';
import { DemoTransferSectionComponent } from './transfer-section.component';
import { TransferBasicComponent } from './basic/transfer-basic.component';
import { TransferTemplateComponent } from './template/transfer-template.component';

@NgModule({
    declarations: [DemoTransferSectionComponent, TransferBasicComponent, TransferTemplateComponent],
    imports: [CommonModule, SharedModule],
    exports: [DemoTransferSectionComponent],
    providers: [],
    entryComponents: [TransferBasicComponent, TransferTemplateComponent]
})
export class DemoTransferModule {}
