import { Component } from '@angular/core';
import { ThySegment, ThySegmentItem } from 'ngx-tethys/segment';

@Component({
    selector: 'thy-segment-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThySegment, ThySegmentItem]
})
export class ThySegmentDisabledExampleComponent {}
