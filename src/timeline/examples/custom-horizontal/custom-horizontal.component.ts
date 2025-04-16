import { Component } from '@angular/core';
import { ThyTimeline, ThyTimelineItem } from 'ngx-tethys/timeline';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-timeline-custom-horizontal-example',
    templateUrl: './custom-horizontal.component.html',
    imports: [ThyTimeline, ThyTimelineItem, ThyButton]
})
export class ThyTimelineCustomHorizontalExampleComponent {
    constructor() {}
}
