import { Component, ViewChild } from '@angular/core';
import { ThyResizableDirective } from 'ngx-tethys/resizable';
import { ThyResizeEvent } from 'ngx-tethys/resizable';

@Component({
    selector: 'thy-resizable-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['../style.scss'],
    standalone: false
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
