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
import { FormsModule } from '@angular/forms';
import { ThyInputModule } from 'ngx-tethys/input';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ThyCanHandleRightItemFnPipe } from './transfer.pipe';
@NgModule({
    declarations: [ThyTransferComponent, ThyTransferListComponent, ThyCanHandleRightItemFnPipe],
    imports: [
        ScrollingModule,
        ThyInputModule,
        FormsModule,
        CommonModule,
        ThyButtonModule,
        DragDropModule,
        ThyIconModule,
        ThyListModule,
        ThySharedModule,
        ThyFlexibleTextModule
    ],
    exports: [ThyTransferComponent, ThyCanHandleRightItemFnPipe]
})
export class ThyTransferModule {}
