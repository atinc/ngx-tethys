import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyButtonComponent } from './button.component';
import { ThyButtonGroupComponent } from './button-group.component';

@NgModule({
    declarations: [
        ThyButtonComponent,
        ThyButtonGroupComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ThyButtonComponent,
        ThyButtonGroupComponent
    ]
})
export class ThyButtonModule {

}
