import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyTimeline, ThyTimelineItem } from 'ngx-tethys/timeline';
import { ThyAvatar } from 'ngx-tethys/avatar';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-timeline-custom-example',
    templateUrl: './custom-description.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTimeline, ThyTimelineItem, ThyAvatar, ThyButton]
})
export class ThyTimelineCustomDescriptionExampleComponent {
    constructor() {}
}
