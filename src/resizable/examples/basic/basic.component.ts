import { Component, ViewChild } from '@angular/core';
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
    @ViewChild(ThyResizableDirective, { static: true }) directive: ThyResizableDirective;

    onResize({ width, height }: ThyResizeEvent): void {
        this.width = width!;
        this.height = height!;
    }
}
