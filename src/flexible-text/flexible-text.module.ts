import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexibleTextComponent } from './flexible-text.component';
import { ThyTooltipModule } from '../tooltip';

@NgModule({
    declarations: [FlexibleTextComponent],
    imports: [CommonModule, ThyTooltipModule],
    exports: [FlexibleTextComponent]
})
export class ThyFlexibleTextModule {}
