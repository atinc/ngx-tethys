import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyTreeBasicExampleComponent } from './basic/basic.component';
import { ThyTreeTemplateExampleComponent } from './template/template.component';
import { ThyTreeDragDropExampleComponent } from './drag-drop/drag-drop.component';
import { ThyTreeCheckableExampleComponent } from './checkable/checkable.component';

const COMPONENTS = [
    ThyTreeBasicExampleComponent,
    ThyTreeTemplateExampleComponent,
    ThyTreeDragDropExampleComponent,
    ThyTreeCheckableExampleComponent
];

@NgModule({
    imports: [CommonModule, NgxTethysModule],
    exports: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    declarations: [...COMPONENTS],
    providers: []
})
export class ThyTreeExamplesModule {}
