import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyPaginationModule } from 'ngx-tethys/pagination';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThySwitchModule } from 'ngx-tethys/switch';
import { ThySkeletonModule } from 'ngx-tethys/skeleton';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TableRowDragDisabledPipe } from './pipes/drag.pipe';
import { TableIsValidModelValuePipe } from './pipes/table.pipe';
import { ThyTableColumnComponent } from './table-column.component';
import { ThyTable } from './table.component';
import { ThyTableSkeleton } from './table-skeleton.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyPaginationModule,
        ThySwitchModule,
        ThyLoadingModule,
        ThyEmptyModule,
        ThySharedModule,
        ThySkeletonModule,
        ThyIconModule,
        DragDropModule,
        ScrollingModule,
        ThyTable,
        ThyTableColumnComponent,
        TableIsValidModelValuePipe,
        TableRowDragDisabledPipe,
        ThyTableSkeleton
    ],
    exports: [ThyTable, ThyTableColumnComponent, ThyTableSkeleton]
})
export class ThyTableModule {}
