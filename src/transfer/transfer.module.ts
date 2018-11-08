import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyTransferComponent } from './transfer.component';
import { ThyTransferListComponent } from './transfer-list.component';
import { ThyButtonModule } from '../button/button.module';
import { SortablejsModule } from 'angular-sortablejs/dist';
@NgModule({
    declarations: [
        ThyTransferComponent,
        ThyTransferListComponent
    ],
    imports: [
        CommonModule,
        ThyButtonModule,
        SortablejsModule
    ],
    exports: [
        ThyTransferComponent
    ]
})
export class ThyTransferModule {

}
