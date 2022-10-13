import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyColorPickerModule } from 'ngx-tethys/color-picker';
import { ThyDialogModule } from 'ngx-tethys/dialog';

export default {
    imports: [CommonModule, FormsModule, ThyDialogModule, ThyColorPickerModule]
};
