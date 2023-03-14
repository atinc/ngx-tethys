import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyButtonGroupComponent } from './button-group.component';
import { ThyButtonIconComponent } from './button-icon.component';
import { ThyButtonComponent } from './button.component';

@NgModule({
    imports: [CommonModule, ThyIconModule, ThyButtonComponent, ThyButtonIconComponent, ThyButtonGroupComponent],
    exports: [ThyButtonComponent, ThyButtonIconComponent, ThyButtonGroupComponent]
})
export class ThyButtonModule {}
