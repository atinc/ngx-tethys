import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTreeModule } from 'ngx-tethys/tree';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyTreeBasicExampleComponent } from './basic/basic.component';
import { ThyTreeCheckableExampleComponent } from './checkable/checkable.component';
import { ThyTreeDragDropExampleComponent } from './drag-drop/drag-drop.component';
import { ThyTreeTemplateExampleComponent } from './template/template.component';
import { ThyTreeVirtualScrollExampleComponent } from './virtual-scroll/virtual-scroll.component';
import { ThyTreeAsyncExampleComponent } from './async/async.component';
import { ThyTreeExpandExampleComponent } from './expand/expand.component';

const COMPONENTS = [
    ThyTreeBasicExampleComponent,
    ThyTreeTemplateExampleComponent,
    ThyTreeDragDropExampleComponent,
    ThyTreeCheckableExampleComponent,
    ThyTreeVirtualScrollExampleComponent,
    ThyTreeAsyncExampleComponent,
    ThyTreeExpandExampleComponent
];

@NgModule({
    imports: [CommonModule, ThyTreeModule, ThyIconModule],
    exports: [...COMPONENTS],
    declarations: [...COMPONENTS],
    providers: []
})
export class ThyTreeExamplesModule {}
