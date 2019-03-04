import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyTreeComponent } from './tree.component';
import { ThyTreeNodeComponent } from './tree-node.component';
import { ThyTreeReplaceRegionComponent } from './tree-replace-region.component';
import { ThyInputModule } from '../input';
import { ThyButtonModule } from '../button';
import { ThyDirectiveModule } from '../directive';
import { SortablejsModule } from 'angular-sortablejs';
import { ThyTreeService } from './tree.service';
import { ThyListModule } from '../list';
import { ThyOptionModule } from '../core/option';
import { FormsModule } from '@angular/forms';
import { ThyLoadingModule } from '../loading';

@NgModule({
    declarations: [
        ThyTreeComponent,
        ThyTreeNodeComponent,
        ThyTreeReplaceRegionComponent
    ],
    imports: [
        CommonModule,
        ThyInputModule,
        ThyButtonModule,
        ThyDirectiveModule,
        SortablejsModule,
        FormsModule,
        ThyListModule,
        ThyOptionModule,
        ThyLoadingModule
    ],
    entryComponents: [ThyTreeComponent],
    exports: [
        ThyTreeComponent,
        ThyTreeNodeComponent,
        ThyTreeReplaceRegionComponent
    ],
    providers: [ThyTreeService]
})
export class ThyTreeModule {}
