import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyButtonComponent } from './button.component';
import { ThyButtonIconComponent } from './button-icon.component';
import { ThyButtonGroupComponent } from './button-group.component';
import { ThyIconModule } from '../icon';

@NgModule({
    declarations: [ThyButtonComponent, ThyButtonIconComponent, ThyButtonGroupComponent],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyButtonComponent, ThyButtonIconComponent, ThyButtonGroupComponent]
})
export class ThyButtonModule {}
