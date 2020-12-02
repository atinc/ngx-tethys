import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySharedModule } from '../shared';
import { ThyIconModule } from '../icon';
import { ThyTimelineComponent } from './timeline.component';
import { ThyTimelineItemComponent } from './timeline-item.component';

@NgModule({
    declarations: [ThyTimelineComponent, ThyTimelineItemComponent],
    entryComponents: [],
    imports: [CommonModule, ThySharedModule, ThyIconModule],
    exports: [ThyTimelineComponent, ThyTimelineItemComponent],
    providers: []
})
export class ThyTimelineModule {}
