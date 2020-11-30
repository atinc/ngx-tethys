import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThyGridComponent } from './grid.component';
import { ThyGridColumnComponent } from './grid-column.component';
import { ThyPaginationModule } from 'ngx-tethys/pagination';
import { ThySwitchModule } from 'ngx-tethys/switch';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { GridIsValidModelValuePipe } from './grid.pipe';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyIconModule } from 'ngx-tethys/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [ThyGridComponent, ThyGridColumnComponent, GridIsValidModelValuePipe],
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
    exports: [ThyGridComponent, ThyGridColumnComponent]
})
export class ThyGridModule {}
