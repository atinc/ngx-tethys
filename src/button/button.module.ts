import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyIconModule } from '../icon';
import { ThyButtonGroupComponent } from './button-group.component';
import { ThyButtonIconComponent } from './button-icon.component';
import { ThyButtonComponent } from './button.component';

@NgModule({
    declarations: [ThyButtonComponent, ThyButtonIconComponent, ThyButtonGroupComponent],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyButtonComponent, ThyButtonIconComponent, ThyButtonGroupComponent]
})
export class ThyButtonModule {}
