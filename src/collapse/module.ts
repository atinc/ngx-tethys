import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyCollapseItemComponent } from './collapse-item.component';
import { ThyCollapseComponent } from './collapse.component';

@NgModule({
    imports: [CommonModule, FormsModule, OverlayModule, ThyInputModule, ThyIconModule, ThyCollapseComponent, ThyCollapseItemComponent],
    exports: [ThyCollapseComponent, ThyCollapseItemComponent]
})
export class ThyCollapseModule {}
