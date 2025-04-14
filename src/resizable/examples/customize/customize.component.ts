import { Component } from '@angular/core';
import { ThyResizableDirective, ThyResizeEvent, ThyResizeHandle } from 'ngx-tethys/resizable';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-resizable-customize-example',
    templateUrl: './customize.component.html',
    styleUrls: ['../style.scss'],
    imports: [ThyResizableDirective, ThyResizeHandle, ThyIcon]
})
export class ThyResizableCustomizeExampleComponent {
    width = 400;
    height = 200;

    onResize({ width, height }: ThyResizeEvent): void {
        this.width = width!;
        this.height = height!;
    }
}
