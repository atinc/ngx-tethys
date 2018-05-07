import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyInputDirective } from './input.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ThyInputDirective
    ],
    exports: [
        ThyInputDirective
    ]
})
export class ThyInputModule {

}
