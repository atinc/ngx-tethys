import { Component, signal } from '@angular/core';
import { ThyResizableDirective, ThyResizeEvent, ThyResizeHandle } from 'ngx-tethys/resizable';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-resizable-customize-example',
    templateUrl: './customize.component.html',
    styleUrls: ['../style.scss'],
    imports: [ThyResizableDirective, ThyResizeHandle, ThyIcon]
})
export class ThyResizableCustomizeExampleComponent {
    width = signal<number>(400);
    height = signal<number>(200);

    onResize({ width, height }: ThyResizeEvent): void {
        this.width.set(width!);
        this.height.set(height!);
    }
}
