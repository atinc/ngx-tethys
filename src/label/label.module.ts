import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyLabelDirective } from './label.directive';

@NgModule({
    declarations: [
        ThyLabelDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ThyLabelDirective
    ]
})
export class ThyLabelModule {

}
