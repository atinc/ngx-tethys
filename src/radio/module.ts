import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyRadioComponent } from './radio.component';
import { ThyRadioGroupComponent } from './group/radio-group.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ThyRadioComponent,
        ThyRadioGroupComponent
    ],
    exports: [
        ThyRadioComponent,
        ThyRadioGroupComponent
    ]
})
export class ThyRadioModule {

}
