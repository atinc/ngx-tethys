import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyFlexibleTextModule } from 'ngx-tethys/flexible-text';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyListModule } from 'ngx-tethys/list';
import { ThySharedModule } from 'ngx-tethys/shared';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyTransferListComponent } from './transfer-list.component';
import { ThyTransferComponent } from './transfer.component';

@NgModule({
    declarations: [ThyTransferComponent, ThyTransferListComponent],
    imports: [
        FormsModule,
        CommonModule,
        ThyButtonModule,
        DragDropModule,
        ThyIconModule,
        ThyListModule,
        ThySharedModule,
        ThyFlexibleTextModule,
        ThyInputModule
    ],
    exports: [ThyTransferComponent]
})
export class ThyTransferModule {}
