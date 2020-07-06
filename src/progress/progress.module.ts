import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyTooltipModule } from '../tooltip';
import { ThyProgressBarComponent } from './bar/progress-bar.component';
import { ThyProgressComponent } from './progress.component';

@NgModule({
    declarations: [ThyProgressComponent, ThyProgressBarComponent],
    imports: [CommonModule, ThyTooltipModule],
    exports: [ThyProgressComponent]
})
export class ThyProgressModule {}
