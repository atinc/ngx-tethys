import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyLabelModule } from 'ngx-tethys/label';
import { ThyListModule } from 'ngx-tethys/list';
import { ThySelectCommonModule, ThySharedModule } from 'ngx-tethys/shared';

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyTreeSelectComponent, ThyTreeSelectNodesComponent } from './tree-select.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,
        ThyLabelModule,
        ThyListModule,
        ThyIconModule,
        ThyEmptyModule,
        ThySelectCommonModule,
        ThySharedModule
    ],
    declarations: [ThyTreeSelectComponent, ThyTreeSelectNodesComponent],
    exports: [ThyTreeSelectComponent, ThyTreeSelectNodesComponent]
})
export class ThyTreeSelectModule {}
