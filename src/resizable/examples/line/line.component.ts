import { Component } from '@angular/core';
import { ThyResizeEvent } from 'ngx-tethys/resizable';

@Component({
    selector: 'thy-resizable-line-example',
    templateUrl: './line.component.html',
    styleUrls: ['./line.component.scss'],
    standalone: false
})
export class ThyResizableLineExampleComponent {
    width = 200;

    directions = ['right'];

    onResize(event: ThyResizeEvent): void {
        this.width = event.width;
    }

    reset() {
        this.width = 200;
    }
}
