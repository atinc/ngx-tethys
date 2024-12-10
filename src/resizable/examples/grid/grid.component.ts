import { Component } from '@angular/core';
import { ThyResizeEvent } from 'ngx-tethys/resizable';

@Component({
    selector: 'thy-resizable-grid-example',
    templateUrl: './grid.component.html',
    styleUrls: ['../style.scss'],
    standalone: false
})
export class ThyResizableGridExampleComponent {
    col = 8;

    onResize({ col }: ThyResizeEvent): void {
        this.col = col!;
    }
}
