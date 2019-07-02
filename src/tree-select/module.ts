import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { ThyLabelModule } from '../label/label.module';
import { ThyTreeSelectComponent } from './tree-select.component';
import { ThyTreeSelectNodesComponent } from './tree-select-nodes.component';
import { ThyListModule } from '../list/list.module';
import { ThyIconModule } from '../icon';

@NgModule({
    imports: [CommonModule, FormsModule, OverlayModule, ThyLabelModule, ThyListModule, ThyIconModule],
    declarations: [ThyTreeSelectComponent, ThyTreeSelectNodesComponent],
    exports: [ThyTreeSelectComponent, ThyTreeSelectNodesComponent]
})
export class ThyTreeSelectModule {}
