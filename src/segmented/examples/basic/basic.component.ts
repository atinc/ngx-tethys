import { Component } from '@angular/core';
import { ThySegmentedEvent } from 'ngx-tethys/segmented';

@Component({
    selector: 'thy-segmented-basic-example',
    templateUrl: './basic.component.html'
})
export class ThySegmentedBasicExampleComponent {
    selectedIndex: number = 0;

    selectedChange(event: ThySegmentedEvent): void {}
}
