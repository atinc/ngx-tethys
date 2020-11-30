import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyFullscreenComponent } from './fullscreen.component';
import { ThyTooltipModule } from '../tooltip';
import { ObserversModule } from '@angular/cdk/observers';

@NgModule({
    declarations: [ThyFullscreenComponent],
    imports: [CommonModule, ThyTooltipModule, ObserversModule],
    exports: [ThyFullscreenComponent]
})
export class ThyFullscreenModule {}
