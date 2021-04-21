import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThyTableComponent } from './table.component';
import { ThyTableColumnComponent } from './table-column.component';
import { ThyPaginationModule } from 'ngx-tethys/pagination';
import { ThySwitchModule } from 'ngx-tethys/switch';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { TableIsValidModelValuePipe } from './table.pipe';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyIconModule } from 'ngx-tethys/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [ThyTableComponent, ThyTableColumnComponent, TableIsValidModelValuePipe],
    imports: [
        CommonModule,
        FormsModule,
        ThyPaginationModule,
        ThySwitchModule,
        ThyLoadingModule,
        ThyEmptyModule,
        ThySharedModule,
        ThyIconModule,
        DragDropModule
    ],
    exports: [ThyTableComponent, ThyTableColumnComponent]
})
export class ThyTableModule {}
