import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ThyResizableDirective, ThyResizeEvent, ThyResizeHandles } from 'ngx-tethys/resizable';

@Component({
    selector: 'thy-resizable-preview-example',
    templateUrl: './preview.component.html',
    styleUrls: ['../style.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyResizableDirective, ThyResizeHandles]
})
export class ThyResizablePreviewExampleComponent {
    width = signal<number>(400);
    height = signal<number>(200);

    onResize({ width, height }: ThyResizeEvent): void {
        this.width.set(width!);
        this.height.set(height!);
    }
}
