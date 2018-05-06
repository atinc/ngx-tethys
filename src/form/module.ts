import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyFormDirective } from './form.directive';
import { ThyFormGroupComponent } from './form-group.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ThyFormDirective,
        ThyFormGroupComponent
    ],
    exports: [
        ThyFormDirective,
        ThyFormGroupComponent
    ]
})
export class ThyFormModule {

}
