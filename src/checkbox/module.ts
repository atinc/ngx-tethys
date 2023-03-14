import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyCheckboxComponent } from './checkbox.component';

@NgModule({
    imports: [CommonModule, FormsModule, ThyCheckboxComponent],
    exports: [ThyCheckboxComponent]
})
export class ThyCheckboxModule {}
