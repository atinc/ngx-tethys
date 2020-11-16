import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTethysModule } from 'ngx-tethys';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ThyListBasicExampleComponent } from './basic/basic.component';
import { ThyListSortExampleComponent } from './sort/sort.component';
import { ThyListGridExampleComponent } from './grid/grid.component';
import { ThyListItemMetaExampleComponent } from './item-meta/item-meta.component';
import { ThyListGridObjectExampleComponent } from './grid-object/grid-object.component';
import { ThyListDividedExampleComponent } from './divided/divided.component';
import { ThyListSelectionExampleComponent } from './selection/selection.component';

const COMPONENTS = [
    ThyListBasicExampleComponent,
    ThyListDividedExampleComponent,
    ThyListSortExampleComponent,
    ThyListSelectionExampleComponent,
    ThyListGridExampleComponent,
    ThyListItemMetaExampleComponent,
    ThyListGridObjectExampleComponent
];

@NgModule({
    imports: [CommonModule, NgxTethysModule, FormsModule, DragDropModule],
    exports: COMPONENTS,
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    providers: []
})
export class ThyListExamplesModule {}
