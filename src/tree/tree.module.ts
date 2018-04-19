import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyTreeComponent } from './tree.component';
import { ThyTreeNodeComponent } from './tree-node.component';

@NgModule({
    declarations: [
        ThyTreeComponent,
        ThyTreeNodeComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ThyTreeComponent,
        ThyTreeNodeComponent
    ]
})
export class ThyTreeModule {

}
