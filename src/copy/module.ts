import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyCopyDirective } from './copy.directive';
import { ThyTooltipModule } from '../tooltip/tooltip.module';

@NgModule({
    declarations: [ThyCopyDirective],
    imports: [CommonModule, ThyTooltipModule],
    exports: [ThyCopyDirective]
})
export class ThyCopyModule {}
