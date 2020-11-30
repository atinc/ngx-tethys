import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyTreeComponent } from './tree.component';
import { ThyTreeNodeComponent } from './tree-node.component';
import { ThyTreeReplaceRegionComponent } from './tree-replace-region.component';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyTreeService } from './tree.service';
import { ThyListModule } from 'ngx-tethys/list';
import { ThyOptionModule } from 'ngx-tethys/shared';
import { FormsModule } from '@angular/forms';
import { ThyLoadingModule } from 'ngx-tethys/loading';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyDragDropModule } from 'ngx-tethys/drag-drop';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';

@NgModule({
    declarations: [ThyTreeComponent, ThyTreeNodeComponent, ThyTreeReplaceRegionComponent],
    imports: [
        CommonModule,
        ThyInputModule,
        ThyButtonModule,
        ThySharedModule,
        FormsModule,
        ThyListModule,
        ThyOptionModule,
        ThyLoadingModule,
        ThyIconModule,
        ThyDragDropModule,
        ThyCheckboxModule
    ],
    entryComponents: [ThyTreeComponent],
    exports: [ThyTreeComponent, ThyTreeNodeComponent, ThyTreeReplaceRegionComponent],
    providers: [ThyTreeService]
})
export class ThyTreeModule {}
