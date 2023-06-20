import { Component, ViewChild } from '@angular/core';
import { ThySegmentComponent, ThySegmentEvent } from 'ngx-tethys/segment';

@Component({
    selector: 'thy-segment-basic-example',
    templateUrl: './basic.component.html'
})
export class ThySegmentBasicExampleComponent {
    @ViewChild('segment') segmentComponent: ThySegmentComponent;

    selectedIndex: number = 0;

    selectedChange(event: ThySegmentEvent): void {}

    setSelectedItem(event: Event) {
        this.segmentComponent.setSelectedItem(event, 1);
    }
}
