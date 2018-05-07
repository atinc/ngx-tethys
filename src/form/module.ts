import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyFormDirective } from './form.directive';
import { ThyFormGroupComponent } from './form-group.component';
import { ThyFormGroupLabelDirective } from './form-group-label.directive';
import { ThyFormSubmitDirective  } from './form-submit.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ThyFormDirective,
        ThyFormGroupComponent,
        ThyFormGroupLabelDirective,
        ThyFormSubmitDirective
    ],
    exports: [
        ThyFormDirective,
        ThyFormGroupComponent,
        ThyFormGroupLabelDirective,
        ThyFormSubmitDirective
    ]
})
export class ThyFormModule {

}
