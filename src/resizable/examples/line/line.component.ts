import { Component, signal } from '@angular/core';
import { ThyResizableDirective, ThyResizeEvent, ThyResizeHandles, ThyResizeDirection } from 'ngx-tethys/resizable';

@Component({
    selector: 'thy-resizable-line-example',
    templateUrl: './line.component.html',
    styleUrls: ['./line.component.scss'],
    imports: [ThyResizableDirective, ThyResizeHandles]
})
export class ThyResizableLineExampleComponent {
    width = signal<number>(200);

    directions = signal<ThyResizeDirection[]>(['right']);

    onResize(event: ThyResizeEvent): void {
        this.width.set(event.width!);
    }

    reset() {
        this.width.set(200);
    }
}
