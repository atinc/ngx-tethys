import { Component, Optional, SkipSelf } from '@angular/core';

@Component({
    selector: 'thy-timeline-custom-example',
    templateUrl: './custom.component.html'
})
export class ThyTimelineCustomExampleComponent {
    public thyColor = '';

    public thyMode = 'left';

    public thyReverse = false;

    constructor() {}
}
