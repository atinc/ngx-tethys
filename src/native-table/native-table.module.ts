import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyNativeTableComponent } from './table/table.component';
import { ThyNativeTableInnerDefaultComponent } from './table/table-inner-default.component';
import { ThyNativeTableInnerScrollComponent } from './table/table-inner-scroll.component';
import { ThyNativeTableBodyComponent } from './table/tbody.component';
import { ThyNativeTableHeaderComponent } from './table/thead.component';
import { ThyNativeTableTrDirective } from './row/tr.directive';
import { ThyNativeTableCellDirective } from './cell/cell.directive';
import { ThyNativeTableThDirective } from './cell/th.directive';
import { ThyNativeTableTdSelectionComponent } from './cell/td-selection.component';
import { ThyNativeTableThSelectionComponent } from './cell/th-selection.component';
import { ThyNativeTableThSortComponent } from './cell/th-sort.component';
import {
    ThyNativeTableEditableDirective,
    ThyNativeTableTdEditCloseDirective,
    ThyNativeTableTdEditOpenDirective,
    ThyNativeTableTdPopoverEditDirective
} from './table-editable';
import { ThyNativeTableThFixedDirective } from './cell/th-fixed.directive';
import { ThyNativeTableTrMeasureComponent } from './row/tr-measure.component';
import { ThyNativeTableTdDirective } from './cell/td.directive';

const EDIT_COMPONENTS = [
    ThyNativeTableEditableDirective,
    ThyNativeTableTdEditCloseDirective,
    ThyNativeTableTdEditOpenDirective,
    ThyNativeTableTdPopoverEditDirective
];
@NgModule({
    imports: [
        CommonModule,
        ThyNativeTableComponent,
        ThyNativeTableInnerScrollComponent,
        ThyNativeTableInnerDefaultComponent,
        ThyNativeTableBodyComponent,
        ThyNativeTableHeaderComponent,
        ThyNativeTableTrDirective,
        ThyNativeTableCellDirective,
        ThyNativeTableThDirective,
        ThyNativeTableTdSelectionComponent,
        ThyNativeTableThSelectionComponent,
        ThyNativeTableThSortComponent,
        ThyNativeTableThFixedDirective,
        ThyNativeTableTrMeasureComponent,
        ThyNativeTableTdDirective,
        ...EDIT_COMPONENTS
    ],
    exports: [
        ThyNativeTableComponent,
        ThyNativeTableInnerScrollComponent,
        ThyNativeTableInnerDefaultComponent,
        ThyNativeTableBodyComponent,
        ThyNativeTableHeaderComponent,
        ThyNativeTableTrDirective,
        ThyNativeTableCellDirective,
        ThyNativeTableThDirective,
        ThyNativeTableTdSelectionComponent,
        ThyNativeTableThSelectionComponent,
        ThyNativeTableThSortComponent,
        ThyNativeTableThFixedDirective,
        ThyNativeTableTdDirective,
        ...EDIT_COMPONENTS
    ]
})
export class ThyNativeTableModule {}
