import { ThyIconModule } from 'ngx-tethys/icon';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyDragDropBasicExampleComponent } from './basic/basic.component';
import { ThyDragDropCdkDragDropExampleComponent } from './cdk-drag-drop/cdk-drag-drop.component';
import { ThyDragDropDisabledExampleComponent } from './disabled/disabled.component';
import { ThyDragDropWithHandleExampleComponent } from './with-handle/with-handle.component';
import { ThyDragDropWithContentExampleComponent } from './with-content/with-content.component';
import { ThyDragDropTreeDragExampleComponent } from './tree-drag/tree-drag.component';
import { ThyListModule } from 'ngx-tethys/list';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThyDragDropModule } from 'ngx-tethys/drag-drop';

const COMPONENTS = [
    ThyDragDropCdkDragDropExampleComponent,
    ThyDragDropBasicExampleComponent,
    ThyDragDropDisabledExampleComponent,
    ThyDragDropWithHandleExampleComponent,
    ThyDragDropWithContentExampleComponent,
    ThyDragDropTreeDragExampleComponent
];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, DragDropModule, ThyDragDropModule, ThyIconModule, ThyListModule, ThyButtonModule, ThySpaceModule],
    exports: [...COMPONENTS]
})
export class ThyDragDropExamplesModule {}
