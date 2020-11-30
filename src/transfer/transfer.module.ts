import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyTransferComponent } from './transfer.component';
import { ThyTransferListComponent } from './transfer-list.component';
import { ThyButtonModule } from 'ngx-tethys/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyListModule } from 'ngx-tethys/list';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';
@NgModule({
    declarations: [ThyTransferComponent, ThyTransferListComponent],
    imports: [CommonModule, ThyButtonModule, DragDropModule, ThyIconModule, ThyListModule, ThySharedModule, ThyFlexibleTextModule],
    exports: [ThyTransferComponent]
})
export class ThyTransferModule {}
