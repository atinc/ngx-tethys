import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyFlexibleTextComponent } from './flexible-text.component';
import { ThyTooltipModule } from 'ngx-tethys/tooltip';
import { ObserversModule } from '@angular/cdk/observers';

@NgModule({
    imports: [CommonModule, ThyTooltipModule, ObserversModule, ThyFlexibleTextComponent],
    exports: [ThyFlexibleTextComponent]
})
export class ThyFlexibleTextModule {}
