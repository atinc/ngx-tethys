import { NgxTethysModule } from 'ngx-tethys';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyTreeBasicExampleComponent } from './basic/basic.component';
import { ThyTreeCheckableExampleComponent } from './checkable/checkable.component';
import { ThyTreeDragDropExampleComponent } from './drag-drop/drag-drop.component';
import { ThyTreeTemplateExampleComponent } from './template/template.component';
import { ThyTreeVirtualScrollExampleComponent } from './virtual-scroll/virtual-scroll.component';

const COMPONENTS = [
    ThyTreeBasicExampleComponent,
    ThyTreeTemplateExampleComponent,
    ThyTreeDragDropExampleComponent,
    ThyTreeCheckableExampleComponent,
    ThyTreeVirtualScrollExampleComponent
];

@NgModule({
    imports: [CommonModule, NgxTethysModule],
    exports: [...COMPONENTS],
    declarations: [...COMPONENTS],
    providers: []
})
export class ThyTreeExamplesModule {}
