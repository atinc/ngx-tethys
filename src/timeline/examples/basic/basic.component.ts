import { Component, Optional, SkipSelf } from '@angular/core';

@Component({
    selector: 'thy-timeline-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyTimelineBasicExampleComponent {
    public thyColor = 'primary';

    public thyMode = 'left';

    public thyReverse = 'sequence';

    constructor() {}
}
