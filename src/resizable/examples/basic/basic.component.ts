import { Component, signal } from '@angular/core';
import { ThyResizableDirective, ThyResizeHandles, ThyResizeEvent } from 'ngx-tethys/resizable';

@Component({
    selector: 'thy-resizable-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['../style.scss'],
    imports: [ThyResizableDirective, ThyResizeHandles]
})
export class ThyResizableBasicExampleComponent {
    width = signal<number>(400);

    height = signal<number>(200);

    disabled = signal<boolean>(false);

    onResize({ width, height }: ThyResizeEvent): void {
        this.width.set(width!);
        this.height.set(height!);
    }
}
