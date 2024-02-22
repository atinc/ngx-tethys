import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyCollapseItem } from './collapse-item.component';
import { ThyCollapse } from './collapse.component';

@NgModule({
    imports: [CommonModule, FormsModule, OverlayModule, ThyInputModule, ThyIconModule, ThyCollapse, ThyCollapseItem],
    exports: [ThyCollapse, ThyCollapseItem]
})
export class ThyCollapseModule {}
