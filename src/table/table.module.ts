import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyPaginationModule } from 'ngx-tethys/pagination';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThySwitchModule } from 'ngx-tethys/switch';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyTableColumnComponent, ThyTableColumnWidthObserverDirective } from './table-column.component';
import { ThyTableComponent } from './table.component';
import { TableIsValidModelValuePipe } from './table.pipe';

@NgModule({
    declarations: [ThyTableComponent, ThyTableColumnComponent, ThyTableColumnWidthObserverDirective, TableIsValidModelValuePipe],
    imports: [
        CommonModule,
        FormsModule,
        ThyPaginationModule,
        ThySwitchModule,
        ThyLoadingModule,
        ThyEmptyModule,
        ThySharedModule,
        ThyIconModule,
        DragDropModule,
        ScrollingModule
    ],
    exports: [ThyTableComponent, ThyTableColumnComponent]
})
export class ThyTableModule {}
