import { Component } from '@angular/core';
import { ThyResizeEvent } from 'ngx-tethys/resizable';

@Component({
    selector: 'thy-resizable-lock-aspect-ratio-example',
    templateUrl: './lock-aspect-ratio.component.html',
    styleUrls: ['../style.scss'],
    standalone: false
})
export class ThyResizableLockAspectRatioExampleComponent {
    width = 400;
    height = 200;

    onResize({ width, height }: ThyResizeEvent): void {
        this.width = width!;
        this.height = height!;
    }
}
