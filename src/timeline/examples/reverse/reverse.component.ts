import { Component } from '@angular/core';
import { ThyTimeline, ThyTimelineItem } from 'ngx-tethys/timeline';
import { ThyAvatar } from 'ngx-tethys/avatar';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-timeline-reverse-example',
    templateUrl: './reverse.component.html',
    imports: [ThyTimeline, ThyTimelineItem, ThyAvatar, ThyButton]
})
export class ThyTimelineReverseExampleComponent {
    reverse = false;
    constructor() {}
}
