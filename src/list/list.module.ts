import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyListComponent } from './list.component';
import { ThyListItemComponent } from './list-item.component';

@NgModule({
    declarations: [
        ThyListComponent,
        ThyListItemComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ThyListComponent,
        ThyListItemComponent
    ]
})
export class ThyListModule {

}
