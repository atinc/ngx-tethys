import { Component, Optional, SkipSelf } from '@angular/core';

@Component({
    selector: 'thy-timeline-reverse-example',
    templateUrl: './reverse.component.html',
    standalone: false
})
export class ThyTimelineReverseExampleComponent {
    reverse = false;
    constructor() {}
}
