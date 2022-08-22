import { Component } from '@angular/core';
import { ThySegmentEvent } from 'ngx-tethys/segment';

@Component({
    selector: 'thy-segment-basic-example',
    templateUrl: './basic.component.html'
})
export class ThySegmentBasicExampleComponent {
    selectedIndex: number = 0;

    selectedChange(event: ThySegmentEvent): void {}
}
