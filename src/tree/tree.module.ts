import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyTreeComponent } from './tree.component';
import { ThyTreeNodeComponent } from './tree-node.component';
import { ThyTreeReplaceRegionComponent } from './tree-replace-region.component';

@NgModule({
    declarations: [
        ThyTreeComponent,
        ThyTreeNodeComponent,
        ThyTreeReplaceRegionComponent
    ],
    imports: [
        CommonModule
    ],
    entryComponents:[
        ThyTreeComponent,
    ],
    exports: [
        ThyTreeComponent,
        ThyTreeNodeComponent,
        ThyTreeReplaceRegionComponent
    ]
})
export class ThyTreeModule {

}
