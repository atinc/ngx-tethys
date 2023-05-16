import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyListComponent } from './list.component';
import { ThyListItemComponent } from './list-item.component';
import { ThySelectionListComponent } from './selection/selection-list';
import { ThyOptionModule } from 'ngx-tethys/shared';
import { ThyListItemMetaComponent } from './list-item-meta.component';
import { ThyAvatarModule } from 'ngx-tethys/avatar';

@NgModule({
    imports: [
        CommonModule,
        ThyOptionModule,
        ThyAvatarModule,
        ThyListComponent,
        ThyListItemComponent,
        ThySelectionListComponent,
        ThyListItemMetaComponent
    ],
    exports: [ThyListComponent, ThyListItemComponent, ThySelectionListComponent, ThyListItemMetaComponent, ThyOptionModule]
})
export class ThyListModule {}
