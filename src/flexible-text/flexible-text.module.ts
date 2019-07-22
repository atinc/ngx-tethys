import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyFlexibleTextComponent } from './flexible-text.component';
import { ThyTooltipModule } from '../tooltip';

@NgModule({
    declarations: [ThyFlexibleTextComponent],
    imports: [CommonModule, ThyTooltipModule],
    exports: [ThyFlexibleTextComponent]
})
export class ThyFlexibleTextModule {}
