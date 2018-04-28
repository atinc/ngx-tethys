import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyTransferComponent } from './transfer.component';
import { ThyTransferListComponent } from './transfer-list.component';
import { ThyButtonModule } from '../button/button.module';

@NgModule({
    declarations: [
        ThyTransferComponent,
        ThyTransferListComponent
    ],
    imports: [
        CommonModule,
        ThyButtonModule
    ],
    exports: [
        ThyTransferComponent
    ]
})
export class ThyTransferModule {

}
