import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ThySegment, ThySegmentEvent, ThySegmentItem } from 'ngx-tethys/segment';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-segment-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThySegment, ThySegmentItem, NgStyle, ThyButton]
})
export class ThySegmentBasicExampleComponent {
    selectedIndex: number = 2;

    selectedChange(event: ThySegmentEvent): void {
        // 使用方需要手动更新 selectedIndex
        this.selectedIndex = event.activeIndex;
    }

    setSelectedItem(event: Event) {
        this.selectedIndex = 1;
    }
}
