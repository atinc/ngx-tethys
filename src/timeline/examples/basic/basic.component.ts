import { Component } from '@angular/core';
import { ThyTimeline, ThyTimelineItem } from 'ngx-tethys/timeline';
import { ThyAvatar } from 'ngx-tethys/avatar';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-timeline-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyTimeline, ThyTimelineItem, ThyAvatar, ThyButton]
})
export class ThyTimelineBasicExampleComponent {
    constructor() {}
}
