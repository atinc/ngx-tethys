import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThySegment, ThySegmentItem } from 'ngx-tethys/segment';

@Component({
    selector: 'thy-segment-disabled-example',
    templateUrl: './disabled.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThySegment, ThySegmentItem]
})
export class ThySegmentDisabledExampleComponent {}
