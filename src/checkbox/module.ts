import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyCheckboxComponent } from './checkbox.component';
import { ThyCheckboxGroupComponent } from './checkbox-group.component';
@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [ThyCheckboxComponent, ThyCheckboxGroupComponent],
    exports: [ThyCheckboxComponent, ThyCheckboxGroupComponent]
})
export class ThyCheckboxModule {}
