import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyNativeTableComponent } from './components/table/table.component';
import { ThyNativeTableInnerDefaultComponent } from './components/table/table-inner-default.component';
import { ThyNativeTableInnerScrollComponent } from './components/table/table-inner-scroll.component';
import { ThyNativeTableBodyComponent } from './components/table/tbody.component';
import { ThyNativeTableHeaderComponent } from './components/table/thead.component';
import { ThyNativeTableTrMeasureComponent } from './components/row/tr-measure.component';
import { ThyNativeTableTrDirective } from './components/row/tr.directive';
import { ThyNativeTableCellDirective } from './components/cell/cell.directive';
import { ThyNativeTableCellFixedDirective } from './components/cell/cell-fixed.directive';
import { ThyNativeTableThDirective } from './components/cell/th.directive';
import { ThyNativeTableTdSelectionComponent } from './components/cell/td-selection.component';
import { ThyNativeTableTdExpandComponent } from './components/cell/td-expand.component';
import { ThyNativeTableThSelectionComponent } from './components/cell/th-selection.component';
import { ThyNativeTableThSortComponent } from './components/cell/th-sort.component';
import {
    ThyNativeTableEditableDirective,
    ThyNativeTableTdEditCloseDirective,
    ThyNativeTableTdEditOpenDirective,
    ThyNativeTableTdPopoverEditDirective
} from './components/table-editable';

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
        ThyNativeTableTrMeasureComponent,
        ThyNativeTableTrDirective,
        ThyNativeTableCellDirective,
        ThyNativeTableCellFixedDirective,
        ThyNativeTableThDirective,
        ThyNativeTableTdSelectionComponent,
        ThyNativeTableTdExpandComponent,
        ThyNativeTableThSelectionComponent,
        ThyNativeTableThSortComponent,
        ThyNativeTableTdEditOpenDirective,
        ThyNativeTableTdPopoverEditDirective,
        ...EDIT_COMPONENTS
    ],
    exports: [
        ThyNativeTableComponent,
        ThyNativeTableInnerScrollComponent,
        ThyNativeTableInnerDefaultComponent,
        ThyNativeTableBodyComponent,
        ThyNativeTableHeaderComponent,
        ThyNativeTableTrMeasureComponent,
        ThyNativeTableTrDirective,
        ThyNativeTableCellDirective,
        ThyNativeTableCellFixedDirective,
        ThyNativeTableThDirective,
        ThyNativeTableTdSelectionComponent,
        ThyNativeTableTdExpandComponent,
        ThyNativeTableThSelectionComponent,
        ThyNativeTableThSortComponent,
        ThyNativeTableTdEditOpenDirective,
        ThyNativeTableTdPopoverEditDirective,
        ...EDIT_COMPONENTS
    ]
})
export class ThyNativeTableModule {}
