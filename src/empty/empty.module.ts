import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyEmptyComponent } from './empty.component';

@NgModule({
    declarations: [
        ThyEmptyComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ThyEmptyComponent
    ]
})
export class ThyEmptyModule {

}
