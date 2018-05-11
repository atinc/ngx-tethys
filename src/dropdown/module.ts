import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyDropdownDirective } from './dropdown.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ThyDropdownDirective
    ],
    exports: [
        ThyDropdownDirective
    ]
})
export class ThyDropdownModule {

}
