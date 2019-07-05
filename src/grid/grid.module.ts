import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThyGridComponent } from './grid.component';
import { ThyGridColumnComponent } from './grid-column.component';
import { ThyPaginationModule } from '../pagination/pagination.module';
import { ThySwitchModule } from '../switch/switch.module';
import { ThyLoadingModule } from '../loading/loading.module';
import { ThyEmptyModule } from '../empty/empty.module';
import { SortablejsModule } from 'angular-sortablejs';
import { GridIsValidModelValuePipe } from './grid.pipe';
import { ThyDirectiveModule } from '../directive';
import { ThyIconModule } from '../icon/icon.module';

@NgModule({
    declarations: [ThyGridComponent, ThyGridColumnComponent, GridIsValidModelValuePipe],
    imports: [
        CommonModule,
        FormsModule,
        ThyPaginationModule,
        ThySwitchModule,
        ThyLoadingModule,
        ThyEmptyModule,
        SortablejsModule,
        ThyDirectiveModule,
        ThyIconModule
    ],
    exports: [ThyGridComponent, ThyGridColumnComponent]
})
export class ThyGridModule {}
