import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyIconModule } from 'ngx-tethys/icon';
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
