import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyFormDirective } from './form.directive';
import { ThyFormGroupComponent } from './form-group.component';
import { ThyFormGroupLabelDirective } from './form-group-label.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ThyFormDirective,
        ThyFormGroupComponent,
        ThyFormGroupLabelDirective
    ],
    exports: [
        ThyFormDirective,
        ThyFormGroupComponent,
        ThyFormGroupLabelDirective
    ]
})
export class ThyFormModule {

}
