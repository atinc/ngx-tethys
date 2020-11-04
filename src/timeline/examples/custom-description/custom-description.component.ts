import { Component, Optional, SkipSelf } from '@angular/core';

@Component({
    selector: 'thy-timeline-custom-example',
    templateUrl: './custom-description.component.html'
})
export class ThyTimelineCustomDescriptionExampleComponent {
    public thyColor = '';

    public thyMode = 'left';

    public thyReverse = 'sequence';

    constructor() {}
}
