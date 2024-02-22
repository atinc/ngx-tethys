import { ThyTooltipModule } from 'ngx-tethys/tooltip';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyProgressCircle } from './progress-circle.component';
import { ThyProgressStrip } from './progress-strip.component';
import { ThyProgress } from './progress.component';

@NgModule({
    imports: [CommonModule, ThyTooltipModule, ThyProgress, ThyProgressStrip, ThyProgressCircle],
    exports: [ThyProgress]
})
export class ThyProgressModule {}
