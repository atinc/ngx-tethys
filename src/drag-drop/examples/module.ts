import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxTethysModule } from 'ngx-tethys';
import { ThyDragDropCdkDragDropExampleComponent } from './cdk-drag-drop/cdk-drag-drop.component';
import { ThyDragDropBasicExampleComponent } from './basic/basic.component';

const COMPONENTS = [ThyDragDropCdkDragDropExampleComponent, ThyDragDropBasicExampleComponent];

@NgModule({
    declarations: [...COMPONENTS],
    entryComponents: [...COMPONENTS],
    imports: [CommonModule, DragDropModule, NgxTethysModule],
    exports: [...COMPONENTS]
})
export class ThyDragDropExamplesModule {}
