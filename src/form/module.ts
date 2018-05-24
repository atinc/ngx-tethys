import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyFormDirective } from './form.directive';
import { ThyFormGroupComponent } from './form-group.component';
import { ThyFormGroupLabelDirective } from './form-group-label.directive';
import { ThyFormSubmitDirective } from './form-submit.directive';
import { ThyFormCheckComponent } from './form-check/form-check.component';
import { ThyInputModule } from '../input/module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ThyInputModule
    ],
    declarations: [
        ThyFormDirective,
        ThyFormGroupComponent,
        ThyFormGroupLabelDirective,
        ThyFormSubmitDirective,
        ThyFormCheckComponent
    ],
    exports: [
        ThyFormDirective,
        ThyFormGroupComponent,
        ThyFormGroupLabelDirective,
        ThyFormSubmitDirective,
        ThyFormCheckComponent
    ]
})
export class ThyFormModule {

}
