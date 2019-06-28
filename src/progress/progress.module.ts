import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyProgressComponent } from './progress.component';
import { ThyProgressBarComponent } from './bar/progress-bar.component';
import { ThyTooltipModule } from '../tooltip';

@NgModule({
    declarations: [ThyProgressComponent, ThyProgressBarComponent],
    imports: [CommonModule, ThyTooltipModule],
    exports: [ThyProgressComponent]
})
export class ThyProgressModule {}
