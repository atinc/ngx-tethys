import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { ThyLabelModule } from 'ngx-tethys/label';
import { ThyTreeSelectComponent } from './tree-select.component';
import { ThyTreeSelectNodesComponent } from './tree-select-nodes.component';
import { ThyListModule } from 'ngx-tethys/list';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThySelectCommonModule } from 'ngx-tethys/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,
        ThyLabelModule,
        ThyListModule,
        ThyIconModule,
        ThyEmptyModule,
        ThySelectCommonModule
    ],
    declarations: [ThyTreeSelectComponent, ThyTreeSelectNodesComponent],
    exports: [ThyTreeSelectComponent, ThyTreeSelectNodesComponent]
})
export class ThyTreeSelectModule {}
