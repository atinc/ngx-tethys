import { Component, Optional, SkipSelf } from '@angular/core';
import { ThyTimeMode } from 'ngx-tethys/timeline';

@Component({
    selector: 'thy-timeline-custom-item-example',
    templateUrl: './custom-item.component.html',
    standalone: false
})
export class ThyTimelineCustomItemExampleComponent {
    public mode: ThyTimeMode = 'left';

    constructor() {}
}
