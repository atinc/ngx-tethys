import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyListComponent } from './list.component';
import { ThyListItemComponent } from './list-item.component';
import { ThySelectionListComponent } from './selection/selection-list';
// import { ThyListOptionComponent } from './option/option';
import { ThyOptionModule } from '../core/option';

@NgModule({
    declarations: [
        ThyListComponent,
        ThyListItemComponent,
        ThySelectionListComponent
    ],
    imports: [
        CommonModule,
        ThyOptionModule
    ],
    exports: [
        ThyListComponent,
        ThyListItemComponent,
        ThySelectionListComponent,
        ThyOptionModule
    ]
})
export class ThyListModule {

}
