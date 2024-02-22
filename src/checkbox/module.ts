import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyCheckbox } from './checkbox.component';

@NgModule({
    imports: [CommonModule, FormsModule, ThyCheckbox],
    exports: [ThyCheckbox]
})
export class ThyCheckboxModule {}
