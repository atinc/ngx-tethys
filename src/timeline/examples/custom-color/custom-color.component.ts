import { Component, Optional, SkipSelf } from '@angular/core';

@Component({
    selector: 'thy-timeline-custom-color-example',
    templateUrl: './custom-color.component.html',
    standalone: false
})
export class ThyTimelineCustomColorExampleComponent {
    public thyColor = 'primary';

    constructor() {}
}
