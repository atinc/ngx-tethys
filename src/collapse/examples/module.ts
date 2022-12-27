import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTreeModule } from 'ngx-tethys/tree';
import { ThyCollapseModule } from 'ngx-tethys/collapse';
import { ThyAvatarModule } from 'ngx-tethys/avatar';
import { ThyDividerModule } from 'ngx-tethys/divider';

export default {
    imports: [CommonModule, FormsModule, ThyIconModule, ThyTreeModule, ThyCollapseModule, ThyAvatarModule, ThyDividerModule]
};
