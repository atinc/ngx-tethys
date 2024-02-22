import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyFlexibleText } from './flexible-text.component';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ObserversModule } from '@angular/cdk/observers';

@NgModule({
    imports: [CommonModule, ThyTooltipModule, ObserversModule, ThyFlexibleText],
    exports: [ThyFlexibleText]
})
export class ThyFlexibleTextModule {}
