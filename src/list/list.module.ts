import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyList } from './list.component';
import { ThyListItem } from './list-item.component';
import { ThySelectionList } from './selection/selection-list';
import { ThyOptionModule } from 'ngx-tethys/shared';
import { ThyListItemMeta } from './list-item-meta.component';
import { ThyAvatarModule } from 'ngx-tethys/avatar';

@NgModule({
    imports: [CommonModule, ThyOptionModule, ThyAvatarModule, ThyList, ThyListItem, ThySelectionList, ThyListItemMeta],
    exports: [ThyList, ThyListItem, ThySelectionList, ThyListItemMeta, ThyOptionModule]
})
export class ThyListModule {}
