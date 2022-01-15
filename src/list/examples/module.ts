import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTethysModule } from 'ngx-tethys';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ThyListBasicExampleComponent } from './basic/basic.component';
import { ThyListSortExampleComponent } from './sort/sort.component';
import { ThyListItemMetaExampleComponent } from './item-meta/item-meta.component';
import { ThyListUniqueKeyExampleComponent } from './unique-key/unique-key.component';
import { ThyListDividedExampleComponent } from './divided/divided.component';
import { ThyListSelectionExampleComponent } from './selection/selection.component';
import { ThyListOperateExampleComponent } from './operate/operate.component';
import { ThyListSelectionMultipleExampleComponent } from './selection-multiple/selection-multiple.component';
import { ThyListLayoutExampleComponent } from './layout/layout.component';
import { ThyListSizeExampleComponent } from './size/size.component';

const COMPONENTS = [
    ThyListBasicExampleComponent,
    ThyListDividedExampleComponent,
    ThyListSortExampleComponent,
    ThyListSelectionExampleComponent,
    ThyListSelectionMultipleExampleComponent,
    ThyListItemMetaExampleComponent,
    ThyListUniqueKeyExampleComponent,
    ThyListOperateExampleComponent,
    ThyListLayoutExampleComponent,
    ThyListSizeExampleComponent
];

@NgModule({
    imports: [CommonModule, NgxTethysModule, FormsModule, DragDropModule],
    exports: COMPONENTS,
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    providers: []
})
export class ThyListExamplesModule {}
