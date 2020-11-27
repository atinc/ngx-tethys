import { Component, Optional, SkipSelf } from '@angular/core';

@Component({
    selector: 'thy-timeline-custom-position-example',
    templateUrl: './custom-position.component.html'
})
export class ThyTimelineCustomPositionExampleComponent {
    public thyMode = 'left';

    public position = 'right';

    constructor() {}
}
