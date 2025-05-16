import { Component } from '@angular/core';
import { ThyTimeDirection, ThyTimeline, ThyTimelineItem, ThyTimeMode } from 'ngx-tethys/timeline';
import { ThyRadioGroup, ThyRadioButton } from 'ngx-tethys/radio';
import { FormsModule } from '@angular/forms';
import { ThyAvatar } from 'ngx-tethys/avatar';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-timeline-position-example',
    templateUrl: './position.component.html',
    imports: [ThyTimeline, ThyTimelineItem, ThyRadioGroup, ThyRadioButton, FormsModule, ThyAvatar, ThyButton]
})
export class ThyTimelinePositionExampleComponent {
    public mode: ThyTimeMode = 'left';

    public direction: ThyTimeDirection = 'horizontal';

    constructor() {}
}
