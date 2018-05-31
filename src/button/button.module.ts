import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyButtonComponent } from './button.component';
import { ThyButtonIconComponent } from './button-icon.component';
import { ThyButtonGroupComponent } from './button-group.component';

@NgModule({
    declarations: [
        ThyButtonComponent,
        ThyButtonIconComponent,
        ThyButtonGroupComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ThyButtonComponent,
        ThyButtonIconComponent,
        ThyButtonGroupComponent
    ]
})
export class ThyButtonModule {

}
