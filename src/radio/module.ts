import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyRadioComponent } from './radio.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ThyRadioComponent
    ],
    exports: [
        ThyRadioComponent
    ]
})
export class ThyRadioModule {

}
