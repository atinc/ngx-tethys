import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThyCheckboxBasicExampleComponent } from './basic/basic.component';
import { FormsModule } from '@angular/forms';
import { ThyCheckboxModule } from 'ngx-tethys/checkbox';
import { ThyListModule } from 'ngx-tethys/list';

export default {
    imports: [CommonModule, FormsModule, ThyCheckboxModule, ThyListModule]
};
