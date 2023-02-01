import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyListModule } from 'ngx-tethys/list';
import { ThyButtonModule } from 'ngx-tethys/button';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

export default {
    imports: [CommonModule, ThyListModule, FormsModule, DragDropModule, ThyIconModule, ThyButtonModule]
};
