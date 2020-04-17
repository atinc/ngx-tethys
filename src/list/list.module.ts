import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyListComponent } from './list.component';
import { ThyListItemComponent } from './list-item.component';
import { ThySelectionListComponent } from './selection/selection-list';
// import { ThyListOptionComponent } from './option/option';
import { ThyOptionModule } from '../core/option';
import { ThyListItemMetaComponent } from './list-item-meta.component';
import { ThyAvatarModule } from '../avatar';

@NgModule({
    declarations: [ThyListComponent, ThyListItemComponent, ThySelectionListComponent, ThyListItemMetaComponent],
    imports: [CommonModule, ThyOptionModule, ThyAvatarModule],
    exports: [
        ThyListComponent,
        ThyListItemComponent,
        ThySelectionListComponent,
        ThyListItemMetaComponent,
        ThyOptionModule
    ]
})
export class ThyListModule {}
