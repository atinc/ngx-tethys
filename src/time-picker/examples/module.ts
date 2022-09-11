import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyGridModule } from 'ngx-tethys/grid';
import { ThySpaceModule } from 'ngx-tethys/space';
import { ThyTimePickerModule } from 'ngx-tethys/time-picker';

export default {
    imports: [CommonModule, FormsModule, ThyTimePickerModule, ThyGridModule, ThySpaceModule, ThyButtonModule]
};
