import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyFormDirective } from './form.directive';
import { ThyFormGroupComponent } from './form-group.component';
import { ThyFormGroupLabelComponent } from './form-group-label.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ThyFormDirective,
        ThyFormGroupComponent,
        ThyFormGroupLabelComponent
    ],
    exports: [
        ThyFormDirective,
        ThyFormGroupComponent,
        ThyFormGroupLabelComponent
    ]
})
export class ThyFormModule {

}
