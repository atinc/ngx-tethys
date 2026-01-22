import { Component, signal } from '@angular/core';
import { ThyResizableDirective, ThyResizeEvent, ThyResizeHandles } from 'ngx-tethys/resizable';

@Component({
    selector: 'thy-resizable-lock-aspect-ratio-example',
    templateUrl: './lock-aspect-ratio.component.html',
    styleUrls: ['../style.scss'],
    imports: [ThyResizableDirective, ThyResizeHandles]
})
export class ThyResizableLockAspectRatioExampleComponent {
    width = signal<number>(400);
    height = signal<number>(200);

    onResize({ width, height }: ThyResizeEvent): void {
        this.width.set(width!);
        this.height.set(height!);
    }
}
