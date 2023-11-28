import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTimeline } from './timeline.component';
import { ThyTimelineItem } from './timeline-item.component';

@NgModule({
    imports: [CommonModule, ThySharedModule, ThyIconModule, ThyTimeline, ThyTimelineItem],
    exports: [ThyTimeline, ThyTimelineItem],
    providers: []
})
export class ThyTimelineModule {}
