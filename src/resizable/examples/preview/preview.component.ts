import { Component } from '@angular/core';
import { ThyResizableDirective, ThyResizeEvent, ThyResizeHandles } from 'ngx-tethys/resizable';

@Component({
    selector: 'thy-resizable-preview-example',
    templateUrl: './preview.component.html',
    styleUrls: ['../style.scss'],
    imports: [ThyResizableDirective, ThyResizeHandles]
})
export class ThyResizablePreviewExampleComponent {
    width = 400;
    height = 200;

    onResize({ width, height }: ThyResizeEvent): void {
        this.width = width!;
        this.height = height!;
    }
}
