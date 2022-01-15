import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyInputModule } from 'ngx-tethys/input';

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyCollapsePanelComponent } from './collapse-panel.component';
import { ThyCollapseComponent } from './collapse.component';

@NgModule({
    imports: [CommonModule, FormsModule, OverlayModule, ThyInputModule, ThyIconModule],
    declarations: [ThyCollapseComponent, ThyCollapsePanelComponent],
    exports: [ThyCollapseComponent, ThyCollapsePanelComponent]
})
export class ThyCollapseModule {}
