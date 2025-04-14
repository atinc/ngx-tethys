import { Component } from '@angular/core';
import { ThyTimeline, ThyTimelineItem } from 'ngx-tethys/timeline';

@Component({
    selector: 'thy-timeline-custom-color-example',
    templateUrl: './custom-color.component.html',
    imports: [ThyTimeline, ThyTimelineItem]
})
export class ThyTimelineCustomColorExampleComponent {
    public thyColor = 'primary';

    constructor() {}
}
