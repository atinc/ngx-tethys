import { ThyDividerModule } from 'ngx-tethys/divider';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyButtonModule } from 'ngx-tethys/button';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

export default {
    imports: [CommonModule, FormsModule, ThyDividerModule, ThySelectModule, ThyButtonModule]
};
