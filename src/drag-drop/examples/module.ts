import { ThyDragDropModule } from 'ngx-tethys/drag-drop';
import { ThyIconModule } from 'ngx-tethys/icon';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyDragDropBasicExampleComponent } from './basic/basic.component';
import { ThyDragDropCdkDragDropExampleComponent } from './cdk-drag-drop/cdk-drag-drop.component';
import { ThyDragDropWithHandleExampleComponent } from './with-handle/with-handle.component';

const COMPONENTS = [ThyDragDropCdkDragDropExampleComponent, ThyDragDropBasicExampleComponent, ThyDragDropWithHandleExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, DragDropModule, ThyDragDropModule, ThyIconModule],
    exports: [...COMPONENTS]
})
export class ThyDragDropExamplesModule {}
