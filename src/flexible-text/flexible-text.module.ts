import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyFlexibleTextComponent } from './flexible-text.component';
import { ThyTooltipModule } from '../tooltip';
import { ObserversModule } from '@angular/cdk/observers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [ThyFlexibleTextComponent],
    imports: [CommonModule, ThyTooltipModule, ObserversModule],
    exports: [ThyFlexibleTextComponent]
})
export class ThyFlexibleTextModule {}
