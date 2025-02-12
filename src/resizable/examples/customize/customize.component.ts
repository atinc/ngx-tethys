import { Component } from '@angular/core';
import { ThyResizeEvent } from 'ngx-tethys/resizable';

@Component({
    selector: 'thy-resizable-customize-example',
    templateUrl: './customize.component.html',
    styleUrls: ['../style.scss'],
    standalone: false
})
export class ThyResizableCustomizeExampleComponent {
    width = 400;
    height = 200;

    onResize({ width, height }: ThyResizeEvent): void {
        this.width = width!;
        this.height = height!;
    }
}
