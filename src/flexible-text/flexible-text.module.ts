import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyFlexibleTextComponent } from './flexible-text.component';
import { ThyFlexibleTextDirective } from './flexible-text.directive';
import { ThyTooltipModule } from '../tooltip';

@NgModule({
    declarations: [ThyFlexibleTextComponent, ThyFlexibleTextDirective],
    imports: [CommonModule, ThyTooltipModule],
    exports: [ThyFlexibleTextComponent, ThyFlexibleTextDirective]
})
export class ThyFlexibleTextModule {}
