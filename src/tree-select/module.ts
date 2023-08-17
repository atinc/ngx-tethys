import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyEmptyModule } from 'ngx-tethys/empty';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyListModule } from 'ngx-tethys/list';
import { ThySelectCommonModule, ThySharedModule } from 'ngx-tethys/shared';
import { ThyTreeSelectComponent, ThyTreeSelectNodesComponent } from './tree-select.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,
        ThyListModule,
        ThyIconModule,
        ThyEmptyModule,
        ThySelectCommonModule,
        ThySharedModule,
        ThyTreeSelectComponent,
        ThyTreeSelectNodesComponent
    ],
    exports: [ThyTreeSelectComponent, ThyTreeSelectNodesComponent]
})
export class ThyTreeSelectModule {}
