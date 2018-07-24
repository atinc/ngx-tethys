import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyKeySelectionDirective } from './key-select.directive';

@NgModule({
    declarations: [
        ThyKeySelectionDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ThyKeySelectionDirective
    ]
})
export class ThyKeySelectModule {

}
