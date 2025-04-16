import { Component } from '@angular/core';
import { ThyTimeline, ThyTimelineItem, ThyTimeMode } from 'ngx-tethys/timeline';
import { ThyAvatar } from 'ngx-tethys/avatar';
import { ThyButton } from 'ngx-tethys/button';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-timeline-custom-item-example',
    templateUrl: './custom-item.component.html',
    imports: [ThyTimeline, ThyTimelineItem, ThyAvatar, ThyButton, ThyIcon]
})
export class ThyTimelineCustomItemExampleComponent {
    public mode: ThyTimeMode = 'left';

    constructor() {}
}
