import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyRadio } from './radio.component';
import { ThyRadioButton } from './button/radio-button.component';
import { ThyRadioGroup } from './group/radio-group.component';

@NgModule({
    imports: [CommonModule, FormsModule, ThyRadio, ThyRadioGroup, ThyRadioButton],
    exports: [ThyRadio, ThyRadioGroup, ThyRadioButton]
})
export class ThyRadioModule {}
