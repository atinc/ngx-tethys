import { NgModule } from '@angular/core';
import { ThyFormDirective } from './form.directive';
import { ThyFormGroupComponent } from './form-group.component';

@NgModule({
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
