import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { ThyGridComponent } from './grid.component';
import { ThyGridColumnComponent } from './grid-column.component';

@NgModule({
    declarations: [
        ThyGridComponent,
        ThyGridColumnComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        ThyGridComponent,
        ThyGridColumnComponent
    ]
})
export class ThyGridModule {

}

