import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyTransfer } from './transfer.component';
import { ThyTransferList } from './transfer-list.component';
import { ThyButtonModule } from 'ngx-tethys/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyListModule } from 'ngx-tethys/list';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';
@NgModule({
    imports: [
        CommonModule,
        ThyButtonModule,
        DragDropModule,
        ThyIconModule,
        ThyListModule,
        ThySharedModule,
        ThyFlexibleTextModule,
        ThyTransfer,
        ThyTransferList
    ],
    exports: [ThyTransfer]
})
export class ThyTransferModule {}
