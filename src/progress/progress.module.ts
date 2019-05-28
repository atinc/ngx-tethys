import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyProgressComponent } from './progress.component';
import { ThyProgressBarComponent } from './bar/progress-bar.component';

@NgModule({
    declarations: [ThyProgressComponent, ThyProgressBarComponent],
    imports: [CommonModule],
    exports: [ThyProgressComponent]
})
export class ThyProgressModule {}
