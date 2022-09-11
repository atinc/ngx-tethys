import { Component, Optional, SkipSelf } from '@angular/core';
import { ThyTimeMode } from 'ngx-tethys/timeline';

@Component({
    selector: 'thy-timeline-position-example',
    templateUrl: './position.component.html'
})
export class ThyTimelinePositionExampleComponent {
    public mode: ThyTimeMode = 'left';

    constructor() {}
}
