import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyLabelModule } from '../label/label.module';
import { ThyTreeSelectComponent } from './tree-select.component';
import { ThyTreeSelectNodesComponent } from './tree-select-nodes.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyLabelModule
    ],
    declarations: [
        ThyTreeSelectComponent,
        ThyTreeSelectNodesComponent
    ],
    exports: [
        ThyTreeSelectComponent,
        ThyTreeSelectNodesComponent
    ]
})
export class ThyTreeSelectModule {

}
