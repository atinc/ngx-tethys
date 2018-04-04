import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThyGridComponent } from './grid.component';
import { ThyGridColumnComponent } from './grid-column.component';
import { ThyPaginationModule } from '../pagination/pagination.module';
import {
    ThyGridColumn, ThyMultiSelectEvent,
    ThyRadioSelectEvent, ThyPage, ThyPageEvent
} from './grid.interface';


@NgModule({
    declarations: [
        ThyGridComponent,
        ThyGridColumnComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ThyPaginationModule
    ],
    exports: [
        ThyGridComponent,
        ThyGridColumnComponent
    ]
})
export class ThyGridModule {

}

