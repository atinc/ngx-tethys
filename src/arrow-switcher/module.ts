import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyArrowSwitcherComponent } from './arrow-switcher.component';

@NgModule({
    declarations: [ThyArrowSwitcherComponent],
    imports: [CommonModule, ThyButtonModule],
    exports: [ThyArrowSwitcherComponent]
})
export class ThyArrowSwitcherModule {}
