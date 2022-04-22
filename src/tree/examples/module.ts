import { NgxTethysModule } from 'ngx-tethys';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyTreeBasicExampleComponent } from './basic/basic.component';
import { ThyTreeCheckableExampleComponent } from './checkable/checkable.component';
import { ThyTreeDragDropExampleComponent } from './drag-drop/drag-drop.component';
import { ThyTreeTemplateExampleComponent } from './template/template.component';
import { ThyTreeVisualScrollingExampleComponent } from './visual-scrolling/visual-scrolling.component';

const COMPONENTS = [
    ThyTreeBasicExampleComponent,
    ThyTreeTemplateExampleComponent,
    ThyTreeDragDropExampleComponent,
    ThyTreeCheckableExampleComponent,
    ThyTreeVisualScrollingExampleComponent
];

@NgModule({
    imports: [CommonModule, NgxTethysModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    declarations: [...COMPONENTS],
    providers: []
})
export class ThyTreeExamplesModule {}
