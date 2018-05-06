import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyInputDirective } from './input.directive';
import { ThyInputGroupComponent } from './input-group.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ThyInputDirective,
        ThyInputGroupComponent
    ],
    exports: [
        ThyInputDirective,
        ThyInputGroupComponent
    ]
})
export class ThyInputModule {

}
