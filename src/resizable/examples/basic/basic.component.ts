import { Component, viewChild } from '@angular/core';
import { ThyResizableDirective, ThyResizeHandles, ThyResizeEvent } from 'ngx-tethys/resizable';

@Component({
    selector: 'thy-resizable-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['../style.scss'],
    imports: [ThyResizableDirective, ThyResizeHandles]
})
export class ThyResizableBasicExampleComponent {
    width = 400;
    height = 200;
    disabled = false;
    readonly directive = viewChild(ThyResizableDirective);

    onResize({ width, height }: ThyResizeEvent): void {
        this.width = width!;
        this.height = height!;
    }
}
