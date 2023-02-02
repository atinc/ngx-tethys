import { ThyWatermarkModule } from 'ngx-tethys/watermark';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyInputModule } from 'ngx-tethys/input';

export default {
    imports: [CommonModule, FormsModule, ThyWatermarkModule, ThyInputModule]
};
