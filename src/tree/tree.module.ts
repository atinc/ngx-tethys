import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyTreeComponent } from './tree.component';
import { ThyTreeNodeComponent } from './tree-node.component';
import { ThyTreeChildRegionComponent } from './tree-child-region.component';

@NgModule({
    declarations: [
        ThyTreeComponent,
        ThyTreeNodeComponent,
        ThyTreeChildRegionComponent
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
        ThyTreeChildRegionComponent
    ]
})
export class ThyTreeModule {

}
