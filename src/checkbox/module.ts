import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyCheckbox } from './checkbox.component';
import { ThyCheckboxGroup } from './group/checkbox-group.component';

@NgModule({
    imports: [CommonModule, FormsModule, ThyCheckbox, ThyCheckboxGroup],
    exports: [ThyCheckbox, ThyCheckboxGroup]
})
export class ThyCheckboxModule {}
