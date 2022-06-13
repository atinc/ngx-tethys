import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyListModule } from 'ngx-tethys/list';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyListBasicExampleComponent } from './basic/basic.component';
import { ThyListDividedExampleComponent } from './divided/divided.component';
import { ThyListItemMetaExampleComponent } from './item-meta/item-meta.component';
import { ThyListLayoutExampleComponent } from './layout/layout.component';
import { ThyListOperateExampleComponent } from './operate/operate.component';
import { ThyListSelectionMultipleExampleComponent } from './selection-multiple/selection-multiple.component';
import { ThyListSelectionExampleComponent } from './selection/selection.component';
import { ThyListSizeExampleComponent } from './size/size.component';
import { ThyListSortExampleComponent } from './sort/sort.component';
import { ThyListUniqueKeyExampleComponent } from './unique-key/unique-key.component';

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
    imports: [CommonModule, ThyListModule, FormsModule, DragDropModule, ThyIconModule],
    exports: COMPONENTS,
    declarations: COMPONENTS,
    providers: []
})
export class ThyListExamplesModule {}
