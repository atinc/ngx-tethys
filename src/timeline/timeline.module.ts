import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThyTimelineComponent } from './timeline.component';
import { ThyTimelineItemComponent } from './timeline-item.component';

@NgModule({
    imports: [CommonModule, ThySharedModule, ThyIconModule, ThyTimelineComponent, ThyTimelineItemComponent],
    exports: [ThyTimelineComponent, ThyTimelineItemComponent],
    providers: []
})
export class ThyTimelineModule {}
