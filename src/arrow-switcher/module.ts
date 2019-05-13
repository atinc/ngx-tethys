import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyButtonModule } from '../button/button.module';
import { ThyArrowSwitcherComponent } from './arrow-switcher.component';

@NgModule({
    declarations: [ThyArrowSwitcherComponent],
    imports: [CommonModule, ThyButtonModule],
    exports: [ThyArrowSwitcherComponent]
})
export class ThyArrowSwitcherModule {}
