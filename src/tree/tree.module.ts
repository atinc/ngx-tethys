import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyListModule } from 'ngx-tethys/list';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyOptionModule, ThySharedModule } from 'ngx-tethys/shared';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyTreeNodeComponent } from './tree-node.component';
import { ThyTreeComponent } from './tree.component';
import { ThyTreeService } from './tree.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ThyTreeNodeDraggablePipe } from './tree.pipe';

@NgModule({
    imports: [
        DragDropModule,
        CommonModule,
        ThyInputModule,
        ThyButtonModule,
        ThySharedModule,
        FormsModule,
        ThyListModule,
        ThyOptionModule,
        ThyLoadingModule,
        ThyIconModule,
        // ThyDragDropModule,
        ThyCheckboxModule,
        ScrollingModule,
        ThyTreeComponent,
        ThyTreeNodeComponent,
        ThyTreeNodeDraggablePipe
    ],
    exports: [ThyTreeComponent, ThyTreeNodeComponent],
    providers: [ThyTreeService]
})
export class ThyTreeModule {}
