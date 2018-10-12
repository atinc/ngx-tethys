import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyKeySelectDirective } from './key-select.directive';

@NgModule({
    declarations: [
        ThyKeySelectDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ThyKeySelectDirective
    ]
})
export class ThyKeySelectModule {

}
